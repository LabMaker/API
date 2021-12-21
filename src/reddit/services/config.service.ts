import { RedditConfig } from '.prisma/client';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { UserDetails } from '../../auth/userDetails.dto';
import { PrismaService } from '../../prisma.service';
import { RedditConfigDocument } from '../../schemas/RedditConfigSchema';
import { User, UserDocument } from '../../schemas/UserSchema';
import { CreateConfigDto } from '../dtos/create-redditconfig.dto';
import { IRedditConfig } from '../interfaces/config.interface';

@Injectable()
export class ConfigService implements IRedditConfig {
  constructor(private prismaService: PrismaService) {}

  async getConfig(id: number): Promise<RedditConfig> {
    return await this.prismaService.redditConfig.findUnique({
      where: {
        id,
      },
    });
  }

  async getConfigs(user: UserDetails): Promise<RedditConfig[]> {
    if (user.type !== 'Bot') throw new UnauthorizedException();
    Logger.log('Reddit Bot Client Requesting Configs', 'Config');

    return await this.prismaService.redditConfig.findMany();
  }

  async createConfig(newConfig: CreateConfigDto): Promise<RedditConfig> {
    try {
      return await this.prismaService.redditConfig.create({
        data: newConfig,
      });
    } catch (err) {
      Logger.error(err, 'Config');
      return;
    }
  }

  async updateConfig(updateConfigDto: CreateConfigDto): Promise<any> {
    const filter = { id: updateConfigDto.id };

    return await this.prismaService.redditConfig.update({
      where: filter,
      data: updateConfigDto,
    });
  }

  async updateMessage(id: number, message: string): Promise<any> {
    return await this.prismaService.redditConfig.update({
      where: { id },
      data: { pmBody: message },
    });
  }

  async deleteConfig(id: number): Promise<any> {
    await this.prismaService.redditConfig.delete({ where: { id } });
    return;
  }
}
