import { DiscordConfig } from '.prisma/client';
import { UserDetails } from '../../auth/userDetails.dto';
import { CreateConfigDto } from '../dtos/create-guildconfig.dto';
import { UpdateConfigDto } from '../dtos/update-guildconfig.dto';

export interface IDiscordConfig {
  getConfig(id: string, user: UserDetails): Promise<DiscordConfig>;
  getConfigs(): Promise<DiscordConfig[]>;
  createConfig(guildConfigDto: CreateConfigDto): Promise<DiscordConfig>;
  updateConfig(
    updateConfigDto: CreateConfigDto,
  ): Promise<DiscordConfig> | Promise<null>;
}
