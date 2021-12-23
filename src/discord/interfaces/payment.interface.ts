import { Payment } from '@prisma/client';
import {
  CreatePaymentDtoArray,
  UpdatePaymentDtoArray,
} from '../dtos/create-payment.dto';

export interface IPaymentService {
  getPayments(serverId: string): Promise<Payment[]>;
  createPayments(payments: CreatePaymentDtoArray): Promise<Payment | any>;
  updatPayments(updatedPayments: UpdatePaymentDtoArray): Promise<Payment[]>;
  deletePayments(deleteIds: number[]);
}
