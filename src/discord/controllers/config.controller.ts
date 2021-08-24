import {
  Body,
  Controller,
  createParamDecorator,
  Get,
  Inject,
  Param,
  Post,
  Put,
  ExecutionContext,
  Req,
  ConsoleLogger,
} from '@nestjs/common';
import { DiscordConfig } from '../../schemas/DiscordConfigSchema';
import { IDiscordConfig } from '../interfaces/config.interface';
import { CreateConfigDto } from '../dtos/create-guildconfig.dto';
import { UpdateConfigDto } from '../dtos/update-guildconfig.dto';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../../schemas/UsersSchema';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!request.session.passport) return null;
    return request.session.passport.user;
  },
);

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
