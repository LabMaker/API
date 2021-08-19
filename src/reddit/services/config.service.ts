import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import {
  RedditConfig,
  RedditConfigDocument,
} from '../../schemas/RedditConfigSchema';
import { CreateConfigDto } from '../dtos/create-redditconfig.dto';
import { IRedditConfig } from '../interfaces/config.interface';

@Injectable()
export class ConfigService implements IRedditConfig {
  constructor(
    @InjectModel(RedditConfig.name)
    private redditConfigRepository: Model<RedditConfigDocument>,
  ) {}

  async getConfig(_id: string): Promise<RedditConfig> {
    return await this.redditConfigRepository.findOne({
      _id,
    });
  }

  async createConfig(newConfig: CreateConfigDto): Promise<RedditConfig> {
    newConfig._id = uuidv4();
    const createdConfig = new this.redditConfigRepository(newConfig);
    return await createdConfig.save();
  }

  async updateConfig(updateConfigDto: CreateConfigDto): Promise<any> {
    const filter = { _id: updateConfigDto._id };
    return await this.redditConfigRepository.findOneAndUpdate(
      filter,
      updateConfigDto,
      {
        new: true,
        useFindAndModify: false,
      },
    );
  }

  async updateMessage(_id: string, message: string): Promise<any> {
    const filter = { _id };
    return await this.redditConfigRepository.findOneAndUpdate(
      filter,
      { pmBody: message },
      {
        new: true,
        useFindAndModify: false,
      },
    );
  }
}
