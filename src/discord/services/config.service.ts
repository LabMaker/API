import { Injectable } from '@nestjs/common';
import {
  DiscordConfig,
  DiscordConfigDocument,
} from '../../schemas/DiscordConfigSchema';
import { IDiscordConfig } from '../interfaces/config.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConfigDto } from '../dtos/create-guildconfig.dto';
import { UpdateConfigDto } from '../dtos/update-guildconfig.dto';

@Injectable()
export class ConfigService implements IDiscordConfig {
  constructor(
    @InjectModel(DiscordConfig.name)
    private guildConfigRepository: Model<DiscordConfigDocument>,
  ) {}

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
