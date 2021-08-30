import { User } from '../schemas/UserSchema';

export type UserDetails = {
  _id: string;
  username: string;
  discriminator: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
  tokenVersion?: number;
  type: string;
};

export type Done = (err: Error, user: User) => void;
