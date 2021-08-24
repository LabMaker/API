import { Inject, Injectable } from '@nestjs/common';
import {
  DiscordConfig,
  DiscordConfigDocument,
} from '../../schemas/DiscordConfigSchema';
import { IDiscordConfig } from '../interfaces/config.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConfigDto, Guild } from '../dtos/create-guildconfig.dto';
import { UpdateConfigDto } from '../dtos/update-guildconfig.dto';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ConfigService implements IDiscordConfig {
  constructor(
    @Inject(HttpService) private readonly httpService: HttpService,
    @InjectModel(DiscordConfig.name)
    private guildConfigRepository: Model<DiscordConfigDocument>,
  ) {}

  fetchGuilds(accessToken: string): Observable<AxiosResponse<Guild[]>> {
    const data = this.httpService
      .get('http://discord.com/api/v8/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .pipe(map((response) => response.data));

    console.log(data);

    return data;
  }

  async getConfig(_id: string): Promise<DiscordConfig> {
    return await this.guildConfigRepository.findOne({
      _id,
    });
  }

  async getConfigs(): Promise<DiscordConfig[]> {
    return await this.guildConfigRepository.find().exec();
  }

  async createConfig(newConfig: CreateConfigDto): Promise<DiscordConfig> {
    const createdConfig = new this.guildConfigRepository(newConfig);
    return await createdConfig.save();
  }

  async updateConfig(updateConfigDto: UpdateConfigDto): Promise<any> {
    const filter = { _id: updateConfigDto._id };
    return await this.guildConfigRepository.findOneAndUpdate(
      filter,
      updateConfigDto,
      {
        new: true,
        useFindAndModify: false,
      },
    );
  }
}
