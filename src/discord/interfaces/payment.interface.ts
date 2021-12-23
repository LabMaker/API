import { Payment } from '@prisma/client';
import {
  CreatePaymentDto,
  CreatePaymentDtoArray,
} from '../dtos/create-payment.dto';

export interface IPaymentService {
  getPayments(serverId: string): Promise<Payment[]>;
  createPayments(payments: CreatePaymentDtoArray): Promise<Payment | any>;
  updatPayments(updatedPayments: CreatePaymentDto[]): Promise<Payment[]>;
  deletePayments(deleteIds: number[]);
}
