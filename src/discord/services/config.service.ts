import { Injectable } from '@nestjs/common';
import { IDiscordConfig } from '../interfaces/config.interface';
import { CreateConfigDto } from '../dtos/create-guildconfig.dto';
import { UpdateConfigDto } from '../dtos/update-guildconfig.dto';
import { PrismaService } from '../../prisma.service';
import { DiscordConfig } from '@prisma/client';

@Injectable()
export class ConfigService implements IDiscordConfig {
  constructor(private prismaService: PrismaService) {}

  async getConfig(id: string): Promise<DiscordConfig> {
    return await this.prismaService.discordConfig.findUnique({ where: { id } });
  }

  async getConfigs(): Promise<DiscordConfig[]> {
    return await this.prismaService.discordConfig.findMany();
  }

  async createConfig(newConfig: CreateConfigDto): Promise<DiscordConfig> {
    //Not Sure Why this is here Move Over to Client Side
    newConfig.paymentConfigId = newConfig.id;

    return await this.prismaService.discordConfig.create({ data: newConfig });
  }

  async updateConfig(updateConfigDto: CreateConfigDto): Promise<any> {
    return await this.prismaService.discordConfig.update({
      where: { id: updateConfigDto.id },
      data: updateConfigDto,
    });
  }
}
