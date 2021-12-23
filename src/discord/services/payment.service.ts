import { Injectable, Logger } from '@nestjs/common';
import {
  CreatePaymentDto,
  CreatePaymentDtoArray,
  UpdatePaymentDto,
} from '../dtos/create-payment.dto';
import { IPaymentService } from '../interfaces/payment.interface';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../prisma.service';
import { Payment } from '@prisma/client';

@Injectable()
export class PaymentService implements IPaymentService {
  constructor(private prismaService: PrismaService) {}

  async getPayments(serverId: string): Promise<Payment[]> {
    return await this.prismaService.payment.findMany({ where: { serverId } });
  }

  async createPayments(
    paymentArray: CreatePaymentDtoArray,
  ): Promise<Payment[] | any> {
    Logger.error(JSON.stringify(paymentArray), 'PaymentArray');
    return await this.prismaService.payment.createMany({
      data: paymentArray.payments,
    });
  }

  async updatPayments(
    updatedPayments: UpdatePaymentDto[],
  ): Promise<Payment[] | any> {
    const savedPayments = [];
    await Promise.all(
      updatedPayments.map(async (payment) => {
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
