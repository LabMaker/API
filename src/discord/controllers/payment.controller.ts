import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Payment } from '@prisma/client';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { IPaymentService } from '../interfaces/payment.interface';

@Controller('discord/payment')
export class PaymentController {
  constructor(
    @Inject('PAYMENT_SERVICE')
    private readonly paymentService: IPaymentService,
  ) {}

  @Get('/:id')
  getPayments(@Param('id') serverId: string): Promise<Payment[]> {
    return this.paymentService.getPayments(serverId);
  }

  @Post()
  async createPayments(
    @Body() body: CreatePaymentDto[],
  ): Promise<Payment[] | any> {
    return await this.paymentService.createPayments(body);
  }

  @Put()
  updatePayments(@Body() body: CreatePaymentDto[]): Promise<Payment[]> {
    return this.paymentService.updatPayments(body);
  }

  @Delete()
  deletePayments(@Body() body: any): Promise<Payment[]> {
    return this.paymentService.deletePayments(body);
  }
}
