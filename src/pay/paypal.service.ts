import {
  HttpException,
  HttpStatus,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';
import { PayGateway } from './pay.gateway';

@Injectable()
export class PayPalService {
  private client = new paypal.core.PayPalHttpClient(this.environment());

  constructor(private readonly payGateway: PayGateway) {}

  private get credentials() {
    if (process.env.ENVIRONMENT === 'PRODUCTION') {
      if (!process.env.PAYPAL_LIVE_CID || !process.env.PAYPAL_LIVE_CSECRET) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'PayPal app credentials were not defined.',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        clientID: process.env.PAYPAL_LIVE_CID,
        clientSecret: process.env.PAYPAL_LIVE_CSECRET,
      };
    } else {
      if (!process.env.PAYPAL_SBX_CID || !process.env.PAYPAL_SBX_CSECRET) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'PayPal app credentials were not defined.',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        clientID: process.env.PAYPAL_SBX_CID,
        clientSecret: process.env.PAYPAL_SBX_CSECRET,
      };
    }
  }

  private environment() {
    const { clientID, clientSecret } = this.credentials;

    if (process.env.ENVIRONMENT === 'PRODUCTION') {
      throw new NotImplementedException();
      // return new paypal.core.LiveEnvironment(clientID, clientSecret);
    }

    // If didnt return above, use Sandbox environment
    return new paypal.core.SandboxEnvironment(clientID, clientSecret);
  }

  async createOrder(price: number): Promise<{ url: string }> {
    if (isNaN(price)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Price for the order must be a number!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    let request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: price,
          },
        },
      ],
      // https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
      application_context: {
        brand_name: 'The best shop',
        landing_page: 'NO_PREFERENCE',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        return_url: 'http://localhost', // TODO: Has to have return url set, so maybe link to a page that closes itself or has success msg?
      },
    });

    let response = await this.client.execute(request);
    let order = response.result;

    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    console.log(`Order: ${JSON.stringify(order)}`);

    let checkoutLink = order.links.find((e) => e.rel == 'approve').href;

    if (checkoutLink) {
      console.log('Checkout Link: ', checkoutLink);

      return { url: checkoutLink };
    } else {
      console.error('Links: ', JSON.stringify(order.links));

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Was unable to retrieve checkout link from PayPal.`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async captureOrder(orderId: string) {
    let request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    // Call API with your client and get a response for your call
    let response = await this.client.execute(request);

    console.log(`Response: ${JSON.stringify(response)}`);
    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    console.log(`Capture: ${JSON.stringify(response.result)}`);
  }

  handleIPN(ev: any) {
    // Order approved by customer, now capture payment
    if (ev.event_type == 'CHECKOUT.ORDER.APPROVED') {
      let oinfo = ev.resource;

      this.captureOrder(oinfo.id);
    }

    // Checkout completed, but funds are still processing!
    if (ev.event_type == 'CHECKOUT.ORDER.COMPLETED') {
      let oinfo = ev.resource;
      let amount = oinfo.gross_amount;

      console.log(
        `Payment of ${amount.value} ${amount.currency_code} is **processing**.`,
      );
    }

    // Funds have been captured from the payee, payment process fully completed
    if (ev.event_type == 'PAYMENT.CAPTURE.COMPLETED') {
      let oinfo = ev.resource;
      let breakdown = oinfo.seller_receivable_breakdown;

      console.log('paypal_fee: ', breakdown.paypal_fee);
      console.log('gross_amount: ', breakdown.gross_amount);
      console.log('net_amount: ', breakdown.net_amount);

      this.payGateway.notifyAll({
        paid: true,
        breakdown: {
          fee: {
            value: breakdown.paypal_fee.value,
            currencyCode: breakdown.paypal_fee.currency_code,
          },
          gross: {
            value: breakdown.gross_amount.value,
            currencyCode: breakdown.gross_amount.currency_code,
          },
          net: {
            value: breakdown.net_amount.value,
            currencyCode: breakdown.net_amount.currency_code,
          },
        },
      });
    }

    console.log('handlePaypalIPN Service');
  }
}
