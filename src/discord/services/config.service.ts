import { Injectable, Logger } from '@nestjs/common';
import { IDiscordConfig } from '../interfaces/config.interface';
import { CreateConfigDto } from '../dtos/create-guildconfig.dto';
import { UpdateConfigDto } from '../dtos/update-guildconfig.dto';
import { PrismaService } from '../../prisma.service';
import { DiscordConfig } from '@prisma/client';

@Injectable()
export class ConfigService implements IDiscordConfig {
  constructor(private prismaService: PrismaService) {}
  private context = 'DiscordConfig';

  async getConfig(id: string): Promise<DiscordConfig> {
    Logger.log('Client Requesting Config', this.context);
    const config = await this.prismaService.discordConfig.findUnique({
      where: { id },
    });

    if (!config) {
      return this.createConfigFromId(id);
    }

    return config;
  }

  async getConfigs(): Promise<DiscordConfig[]> {
    return await this.prismaService.discordConfig.findMany();
  }

  async createConfig(newConfig: CreateConfigDto): Promise<DiscordConfig> {
    //Not Sure Why this is here Move Over to Client Side
    newConfig.paymentConfigId = newConfig.id;
    Logger.log('Attempting to Create New Server Config', this.context);
    return await this.prismaService.discordConfig.create({ data: newConfig });
  }

  private async createConfigFromId(id: string) {
    return await this.prismaService.discordConfig.create({
      data: { id, paymentConfigId: id },
    });
  }

  async updateConfig(updateConfigDto: CreateConfigDto): Promise<any> {
    return await this.prismaService.discordConfig.update({
      where: { id: updateConfigDto.id },
      data: updateConfigDto,
    });
  }
}
