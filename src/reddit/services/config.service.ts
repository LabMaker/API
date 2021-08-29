import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { UserDetails } from '../../auth/userDetails.dto';
import {
  RedditConfig,
  RedditConfigDocument,
} from '../../schemas/RedditConfigSchema';
import { User, UserDocument } from '../../schemas/UserSchema';
import { CreateConfigDto } from '../dtos/create-redditconfig.dto';
import { IRedditConfig } from '../interfaces/config.interface';

@Injectable()
export class ConfigService implements IRedditConfig {
  constructor(
    @InjectModel(RedditConfig.name)
    private redditConfigRepository: Model<RedditConfigDocument>,
    @InjectModel(User.name) private userRepo: Model<UserDocument>,
  ) {}

  async getConfig(_id: string): Promise<RedditConfig> {
    return await this.redditConfigRepository.findOne({
      _id,
    });
  }

  async createConfig(
    newConfig: CreateConfigDto,
    user: UserDetails,
  ): Promise<RedditConfig> {
    newConfig._id = uuidv4();
    try {
      const createdConfig = new this.redditConfigRepository(newConfig);
      const savedUser = await createdConfig.save();
      await this.userRepo.findByIdAndUpdate(user._id, {
        $addToSet: { nodes: newConfig._id },
      });
      return savedUser;
    } catch (err) {
      console.log(err);
      return;
    }
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

  async deleteConfig(_id: string, user: UserDetails): Promise<any> {
    await this.redditConfigRepository.deleteOne({ _id });
    await this.userRepo.findByIdAndUpdate(user._id, {
      $pull: { nodes: _id },
    });
    return;
  }
}
