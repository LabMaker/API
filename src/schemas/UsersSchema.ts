import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: string;

  @Prop({ required: true, unique: true })
  discordId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  discriminator: string;

  @Prop({ nullable: true })
  avatar: string;

  @Prop()
  accessToken: string;

  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
