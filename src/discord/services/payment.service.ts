import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
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

  async createPayments(payments: CreatePaymentDto[]): Promise<Payment[] | any> {
    return await this.prismaService.payment.createMany({
      data: payments,
    });
  }

  async updatPayments(
    updatedPayments: CreatePaymentDto[],
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
