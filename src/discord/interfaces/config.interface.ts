import { DiscordConfig } from '../../schemas/DiscordConfigSchema';
import { ObjectID } from 'typeorm';
import { CreateConfigDto } from '../dtos/create-guildconfig.dto';
import { UpdateConfigDto } from '../dtos/update-guildconfig.dto';
import { Guild } from '../dtos/Guild.dto';
import { UserDetails } from '../../auth/userDetails.dto';

export interface IDiscordConfig {
  getConfig(id: string): Promise<DiscordConfig>;
  getConfigs(): Promise<DiscordConfig[]>;
  createConfig(guildConfigDto: CreateConfigDto): Promise<DiscordConfig>;
  updateConfig(
    updateConfigDto: UpdateConfigDto,
  ): Promise<DiscordConfig> | Promise<null>;
}
