import { Request, Response } from 'express';
import { User } from '../schemas/UserSchema';
import { UserDetails } from './userDetails.dto';

export interface AuthenticationProvider {
  verify(token: string);
  validateUser(details: UserDetails);
  createUser(details: UserDetails);
  findUser(discordId: string): Promise<User | undefined>;
  refreshToken(res: Response, req: Request);
  createBotToken();
}
