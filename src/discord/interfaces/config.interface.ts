import { DiscordConfig } from '../../schemas/DiscordConfigSchema';
import { CreateConfigDto, Guild } from '../dtos/create-guildconfig.dto';
import { UpdateConfigDto } from '../dtos/update-guildconfig.dto';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

export interface IDiscordConfig {
  getConfig(id: string): Promise<DiscordConfig>;
  getConfigs(): Promise<DiscordConfig[]>;
  createConfig(guildConfigDto: CreateConfigDto): Promise<DiscordConfig>;
  updateConfig(
    updateConfigDto: UpdateConfigDto,
  ): Promise<DiscordConfig> | Promise<null>;
  fetchGuilds(accessToken: string): Observable<AxiosResponse<Guild[]>>;
}
