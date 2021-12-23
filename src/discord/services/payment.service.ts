import { Injectable, Logger } from '@nestjs/common';
import {
  CreatePaymentDto,
  CreatePaymentDtoArray,
  UpdatePaymentDto,
  UpdatePaymentDtoArray,
} from '../dtos/create-payment.dto';
import { IPaymentService } from '../interfaces/payment.interface';
import { v4 as uuidv4 } from 'uuid';
import { Payment } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PaymentService implements IPaymentService {
  constructor(private prismaService: PrismaService) {}
  private readonly logger = new Logger(PaymentService.name);

  async getPayments(serverId: string): Promise<Payment[]> {
    return await this.prismaService.payment.findMany({ where: { serverId } });
  }

  async createPayments(
    paymentArray: CreatePaymentDtoArray,
  ): Promise<Payment[] | any> {
    this.logger.error(JSON.stringify(paymentArray));
    return await this.prismaService.payment.createMany({
      data: paymentArray.payments,
    });
  }

  async updatPayments(
    updatedPayments: UpdatePaymentDtoArray,
  ): Promise<Payment[] | any> {
    const savedPayments = [];
    const { payments } = updatedPayments;

    await Promise.all(
      payments.map(async (payment) => {
        const updatedPayment = await this.prismaService.payment.update({
          where: { id: payment.id },
          data: payment,
        });
        savedPayments.push(updatedPayment);
      }),
    );

    return savedPayments;
  }

  async deletePayments(deleteIds: number[]) {
    deleteIds.forEach(
      async (id) => await this.prismaService.payment.delete({ where: { id } }),
    );
  }
}
