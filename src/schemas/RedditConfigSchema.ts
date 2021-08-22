import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import * as mongoose from 'mongoose';
import { Payment } from './PaymentSchema';
import { ObjectId } from 'mongodb';
import { ObjectID } from 'typeorm';

export type RedditConfigDocument = RedditConfig & Document;

@Schema()
export class RedditConfig {
  @Prop()
  _id: string;

  @Prop({ required: true })
  clientId: string;

  @Prop({ required: true })
  clientSecret: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  userAgent: string;

  @Prop({ default: 'Hey' })
  title: string;

  @Prop({ default: 'Saw your post just had a few questions about it.' })
  pmBody: string;

  @Prop({ required: true })
  subreddits: string[];

  @Prop()
  forbiddenWords: string[];

  @Prop()
  blockedUsers: string[];
}

export const RedditConfigSchema = SchemaFactory.createForClass(RedditConfig);
