import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { PayPalService } from './paypal.service';

@Controller('pay')
export class PayController {
  constructor(private payPalService: PayPalService) {}

  // TODO: protect route
  @Get('create_order/:price')
  async paypalCreateOrder(
    @Param('price') price: number,
  ): Promise<{ url: string }> {
    return await this.payPalService.createOrder(price);
  }

  @Post('pipn')
  // @HttpCode() - might need to use this later if IPN requires HTTP 200 instead of 201 which is default for nest
  paypalIPN(@Req() request: Request): void {
    console.log('paypalIPN', request.body);

    this.payPalService.handleIPN(request.body);
  }
}
