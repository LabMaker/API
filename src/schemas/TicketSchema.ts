import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop()
  _id: string;

  @Prop({ required: true })
  ticketId: string;

  @Prop({ required: true })
  serverId: string;

  @Prop({ required: true })
  channelId: string;

  @Prop()
  type: string;

  @Prop()
  subject: string;

  @Prop()
  time: string;

  @Prop()
  level: string;

  @Prop()
  budget: string;

  @Prop({ default: false })
  submitted: boolean;

  // For now we only support paypal, so this is unneccessarrryryyr
  // @Prop()
  // paymentMethod: string;

  @Prop()
  transactionId: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
