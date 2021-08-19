import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  @Prop()
  _id: string;

  //No Nodes Implemented as of right now so Default Node is always 0
  @Prop({ default: 0, required: true })
  nodeId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  value: string;

  @Prop({ required: true })
  type: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
