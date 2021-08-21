import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LogDocument = Log & Document;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
})
export class Log {
  @Prop({ required: true })
  _id: string;

  //No Nodes Implemented as of right now so Default Node is always 0
  @Prop({ required: true })
  nodeId: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  subId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  subreddit: string;

  @Prop({ required: true })
  pm: boolean;
}

export const LogSchema = SchemaFactory.createForClass(Log);
