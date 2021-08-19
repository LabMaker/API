import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RedditConfig } from '../../schemas/RedditConfigSchema';
import { CreateConfigDto } from '../dtos/create-redditconfig.dto';
import { IRedditConfig } from '../interfaces/config.interface';

@Controller('reddit/config')
export class ConfigController {
  constructor(
    @Inject('REDDIT_CONFIG_SERVICE')
    private readonly configService: IRedditConfig,
  ) {}

  @Get('/:id')
  getConfig(@Param('id') id: string): Promise<RedditConfig> {
    return this.configService.getConfig(id);
  }

  @Post()
  createConfig(@Body() body: CreateConfigDto): Promise<RedditConfig> {
    return this.configService.createConfig(body);
  }

  @Put()
  updateConfig(@Body() body: CreateConfigDto) {
    return this.configService.updateConfig(body);
  }

  @Put('/:id')
  updateMessage(@Param('id') id: string, @Body() body: any) {
    return this.configService.updateMessage(id, body.pmBody);
  }
}
