import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DiscordConfig } from '../../schemas/DiscordConfigSchema';
import { IDiscordConfig } from '../interfaces/config.interface';
import { CreateConfigDto } from '../dtos/create-guildconfig.dto';
import { UpdateConfigDto } from '../dtos/update-guildconfig.dto';

@Controller('discord/config')
export class ConfigController {
  constructor(
    @Inject('DISCORD_CONFIG_SERVICE')
    private readonly configService: IDiscordConfig,
  ) {}

  @Get('/:id')
  getConfig(@Param('id') id: string): Promise<DiscordConfig> {
    return this.configService.getConfig(id);
  }

  @Get()
  async getConfigs() {
    return this.configService.getConfigs();
  }

  @Post()
  createConfig(@Body() body: CreateConfigDto): Promise<DiscordConfig> {
    return this.configService.createConfig(body);
  }

  @Put()
  updateConfig(@Body() body: UpdateConfigDto) {
    return this.configService.updateConfig(body);
  }
}
