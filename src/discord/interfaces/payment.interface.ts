import { Payment } from '../../schemas/PaymentSchema';
import { CreatePaymentDto } from '../dtos/create-payment.dto';

export interface IPaymentService {
  getPayments(nodeId: string): Promise<Payment[]>;
  createPayments(payments: CreatePaymentDto[]): Promise<Payment | any>;
  updatPayments(updatedPayments: CreatePaymentDto[]): Promise<Payment[]>;
  deletePayments(deleteIds: string[]);
}
