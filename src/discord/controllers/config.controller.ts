import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { IDiscordConfig } from '../interfaces/config.interface';
import { CreateConfigDto } from '../dtos/create-guildconfig.dto';
import { JwtAuthGuard } from '../../utils/guards/Jwt.guard';
import { DiscordConfig } from '@prisma/client';

@Controller('discord/config')
export class ConfigController {
  constructor(
    @Inject('DISCORD_CONFIG_SERVICE')
    private readonly configService: IDiscordConfig,
  ) {}

  private context = 'DiscordConfigController';

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(JwtAuthGuard)
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
  updateConfig(@Body() body: CreateConfigDto) {
    return this.configService.updateConfig(body);
  }
}
