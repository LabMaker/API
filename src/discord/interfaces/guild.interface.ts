import { UserDetails } from '../../auth/userDetails.dto';
import { Guild } from '../dtos/Guild.dto';

export interface IGuild {
  fetchGuilds(user: UserDetails): Promise<Guild[]>;
  getLocalData(serverId: string): Promise<any>;
}
