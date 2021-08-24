import { User } from '../../schemas/UsersSchema';
import { UserDetails } from '../dtos/UserDetails.dto';

export interface AuthenticationProvider {
  validateUser(details: UserDetails);
  createUser(details: UserDetails);
  findUser(discordId: string): Promise<User | undefined>;
}
