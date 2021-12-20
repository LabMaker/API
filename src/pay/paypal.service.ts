import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';
import { firstValueFrom } from 'rxjs';
import { PayGateway } from './pay.gateway';

@Injectable()
export class PayPalService {
  private context = 'PayPal Service'; // For logger
  private client = new paypal.core.PayPalHttpClient(this.environment());

  constructor(
    private readonly payGateway: PayGateway,
    private httpService: HttpService,
  ) {}

  private get credentials() {
    let creds: { clientID: string; clientSecret: string };

    // Set credentials depending on env
    if (process.env.ENVIRONMENT === 'PRODUCTION') {
      creds = {
        clientID: process.env.PAYPAL_LIVE_CID,
        clientSecret: process.env.PAYPAL_LIVE_CSECRET,
      };
    } else {
      creds = {
        clientID: process.env.PAYPAL_SBX_CID,
        clientSecret: process.env.PAYPAL_SBX_CSECRET,
      };
    }

    // If client id or secret are not present, return an error
    if (!creds || !creds.clientID || !creds.clientSecret) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'PayPal app credentials are not defined.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Return creds if no error was thrown above
    return creds;
  }

  private get webhookID(): string {
    const whid =
      process.env.ENVIRONMENT === 'PRODUCTION'
        ? process.env.PAYPAL_LIVE_WHID
        : process.env.PAYPAL_SBX_WHID;

    if (!whid) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'PayPal WHID is not defined.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return whid;
  }

  private environment() {
    const { clientID, clientSecret } = this.credentials;

    if (process.env.ENVIRONMENT === 'PRODUCTION') {
      return new paypal.core.LiveEnvironment(clientID, clientSecret);
    }

    // If didnt return above, use Sandbox environment
    return new paypal.core.SandboxEnvironment(clientID, clientSecret);
  }

  /**
   * Create a new order.
   * @param price Price of order.
   * @returns URL to checkout that customer should use to complete the order.
   */
  public async createOrder(price: number): Promise<{ url: string }> {
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
    let checkoutLink = order.links.find((e) => e.rel == 'approve').href;

    if (checkoutLink) {
      return { url: checkoutLink };
    } else {
      Logger.warn(
        `Couldn't find checkout link amongst these links: ${JSON.stringify(
          order.links,
        )}`,
        this.context,
      );

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Was unable to retrieve checkout link from PayPal.`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Capture order after the customer has approved it.
   * @param orderId ID to order that we need to capture.
   */
  private async captureOrder(orderId: string) {
    let request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    // Call API with your client and get a response for your call
    let response = await this.client.execute(request);

    Logger.log(
      `Capturing Order: ${JSON.stringify(response.result)}`,
      this.context,
    );
  }

  /**
   * Handle webhook events.
   * Checks if it is valid before using.
   * @param data Webhook data.
   * @param headers Webhook request headers.
   */
  public async handleWH(data: any, headers: object) {
    // Verify WH before accepting it as valid and using data in it.
    const isValid = await this.verifyWH(headers, data);

    if (isValid) {
      // Order approved by customer, now capture payment
      if (data.event_type == 'CHECKOUT.ORDER.APPROVED') {
        let oinfo = data.resource;

        this.captureOrder(oinfo.id);

        Logger.log(
          `Checkout completed, attempting to capture funds..`,
          this.context,
        );
      }

      // Checkout completed, but funds are still processing!
      if (data.event_type == 'CHECKOUT.ORDER.COMPLETED') {
        let oinfo = data.resource;
        let amount = oinfo.gross_amount;

        Logger.log(
          `Payment of ${amount.value} ${amount.currency_code} is **processing**.`,
          this.context,
        );
      }

      // Funds have been captured from the payee, payment process fully completed
      if (data.event_type == 'PAYMENT.CAPTURE.COMPLETED') {
        let oinfo = data.resource;
        let breakdown = oinfo.seller_receivable_breakdown;

        Logger.log(
          `Captured A Payment. Net: ${breakdown.net_amount}, Paypal Fee: ${breakdown.paypal_fee}`,
          this.context,
        );

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
    }
  }

  /**
   * Verify the webhooks integrity - that is was actually sent by paypal.
   * @param headers Webhooks request headers.
   * @param data Webhook data
   * @returns True/False depending on if it is valid or not.
   */
  public async verifyWH(headers: object, data: any) {
    const verifyEndPoint =
      process.env.ENVIRONMENT === 'PRODUCTION'
        ? 'https://api-m.paypal.com/v1/notifications/verify-webhook-signature'
        : 'https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature';

    // base64 encode our credentials to form our token to send to paypal
    const cred = this.credentials;
    const authTkn = Buffer.from(
      `${cred.clientID}:${cred.clientSecret}`,
    ).toString('base64');

    try {
      // Send webhook details to paypal so they can verify it for us
      const resp = await firstValueFrom(
        this.httpService.post(
          `${verifyEndPoint}`,
          {
            auth_algo: headers['paypal-auth-algo'],
            cert_url: headers['paypal-cert-url'],
            transmission_id: headers['paypal-transmission-id'],
            transmission_sig: headers['paypal-transmission-sig'],
            transmission_time: headers['paypal-transmission-time'],
            webhook_id: this.webhookID,
            webhook_event: data,
          },
          {
            timeout: 10000,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${authTkn}`,
              'User-Agent': 'LabMaker-PIPN-Verifier/0.1',
            },
          },
        ),
      );

      if (resp.data.verification_status == 'SUCCESS') {
        return true;
      }
    } catch (err) {
      const resp = err.response;
      const data = resp.data;

      let msg = `Error verifying webhook: ${resp.status} ${resp.statusText} => `;

      if (data.error && data.error_description)
        msg += `${data.error}: ${data.error_description}`;
      // Just pass through whole json body if error doesn't conform to fields in if above, so atleast we have everything we need to handle an error
      else msg += JSON.stringify(data);

      Logger.error(msg, this.context);
      return false;
    }

    // If true isn't returned above, then we must have failed somewhere
    Logger.warn('Invalid webhook recieved', this.context);
    return false;
  }
}
