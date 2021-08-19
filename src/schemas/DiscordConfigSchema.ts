import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import * as mongoose from 'mongoose';
import { Payment } from './PaymentSchema';
import { ObjectId } from 'mongodb';
import { ObjectID } from 'typeorm';

export type DiscordConfigDocument = DiscordConfig & Document;

@Schema()
export class DiscordConfig {
  @Prop()
  _id: string;

  @Prop({ default: '?' })
  prefix: string;

  @Prop({
    default: 'https://i.imgur.com/rDzblHE.gif',
  })
  embedImageUrl: string;

  @Prop({ required: true })
  paymentConfigId: string;

  @Prop({ default: false })
  autoSwitcher: Boolean;

  @Prop({ default: false })
  autoTicket: Boolean;

  @Prop({ default: false })
  autoReact: Boolean;
}

export const DiscordConfigSchema = SchemaFactory.createForClass(DiscordConfig);
