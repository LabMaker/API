import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from '../../schemas/PaymentSchema';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { IPaymentService } from '../interfaces/payment.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PaymentService implements IPaymentService {
  constructor(
    @InjectModel(Payment.name)
    private paymentRepository: Model<PaymentDocument>,
  ) {}

  async getPayments(nodeId: string): Promise<Payment[]> {
    const filter = { nodeId };

    return await this.paymentRepository.find(filter);
  }

  async createPayments(payments: CreatePaymentDto[]): Promise<Payment[] | any> {
    const map = await Promise.all(
      payments.map(async (payment) => {
        payment._id = uuidv4();

        const newPayment = new this.paymentRepository(payment);
        await newPayment.save();

        return payment;
      }),
    );

    return map;
  }

  async updatPayments(
    updatedPayments: CreatePaymentDto[],
  ): Promise<Payment[] | any> {
    const map = await Promise.all(
      updatedPayments.map(async (payment) => {
        const filter = { _id: payment._id };
        const updatedPayment = await this.paymentRepository.findOneAndUpdate(
          filter,
          payment,
          {
            new: true,
            useFindAndModify: false,
          },
        );

        return updatedPayment;
      }),
    );

    return map;
  }

  async deletePayments(deleteIds: string[]) {
    await this.paymentRepository.deleteMany({ _id: { $in: deleteIds } });
  }
}
