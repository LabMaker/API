import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  @Prop()
  _id: string;

  @Prop({ default: 0, required: true })
  serverId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  value: string;

  @Prop({ required: true })
  type: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
