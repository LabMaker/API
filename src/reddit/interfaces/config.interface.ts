import { RedditConfig } from '../../schemas/RedditConfigSchema';
import { CreateConfigDto } from '../dtos/create-redditconfig.dto';

export interface IRedditConfig {
  getConfig(id: string): Promise<RedditConfig>;
  createConfig(guildConfigDto: CreateConfigDto): Promise<RedditConfig>;
  updateConfig(
    updateConfigDto: CreateConfigDto,
  ): Promise<RedditConfig> | Promise<null>;
  updateMessage(id: string, message: string): Promise<any>;
}