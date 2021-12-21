import { RedditConfig } from '.prisma/client';
import { UserDetails } from '../../auth/userDetails.dto';
// import { RedditConfig } from '../../schemas/RedditConfigSchema';
import { CreateConfigDto } from '../dtos/create-redditconfig.dto';

export interface IRedditConfig {
  getConfig(id: number): Promise<RedditConfig>;
  getConfigs(user: UserDetails): Promise<RedditConfig[]>;
  createConfig(guildConfigDto: CreateConfigDto): Promise<RedditConfig>;
  updateConfig(
    updateConfigDto: CreateConfigDto,
  ): Promise<RedditConfig> | Promise<null>;
  updateMessage(id: number, message: string): Promise<any>;
  deleteConfig(id: number): Promise<any>;
}
