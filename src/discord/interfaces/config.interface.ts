import { DiscordConfig } from '.prisma/client';
import { CreateConfigDto } from '../dtos/create-guildconfig.dto';
import { UpdateConfigDto } from '../dtos/update-guildconfig.dto';

export interface IDiscordConfig {
  getConfig(id: string): Promise<DiscordConfig>;
  getConfigs(): Promise<DiscordConfig[]>;
  createConfig(guildConfigDto: CreateConfigDto): Promise<DiscordConfig>;
  updateConfig(
    updateConfigDto: CreateConfigDto,
  ): Promise<DiscordConfig> | Promise<null>;
}
