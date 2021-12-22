import { RedditConfig } from '.prisma/client';
import { UserDetails } from '../../auth/userDetails.dto';
import { CreateConfigDto } from '../dtos/create-redditconfig.dto';
import { UpdateConfigDto } from '../dtos/update-redditconfig.dto';

export interface IRedditConfig {
  getConfig(id: number): Promise<RedditConfig>;
  getConfigs(user: UserDetails): Promise<RedditConfig[]>;
  createConfig(guildConfigDto: CreateConfigDto): Promise<RedditConfig>;
  updateConfig(
    updateConfigDto: UpdateConfigDto,
  ): Promise<RedditConfig> | Promise<null>;
  updateMessage(id: number, message: string): Promise<any>;
  deleteConfig(id: number): Promise<any>;
  getProfile(username: string): Promise<any>;
}
