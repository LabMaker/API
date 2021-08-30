import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserDetails } from '../../auth/userDetails.dto';
import { RedditConfig } from '../../schemas/RedditConfigSchema';
import { CurrentUser } from '../../utils/getUser.decorator';
import { JwtAuthGuard } from '../../utils/guards/Jwt.guard';
import { CreateConfigDto } from '../dtos/create-redditconfig.dto';
import { IRedditConfig } from '../interfaces/config.interface';

@Controller('reddit/config')
export class ConfigController {
  constructor(
    @Inject('REDDIT_CONFIG_SERVICE')
    private readonly configService: IRedditConfig,
  ) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getConfig(@Param('id') id: string): Promise<RedditConfig> {
    return this.configService.getConfig(id);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  getAll(@CurrentUser() user: UserDetails): Promise<RedditConfig[]> {
    return this.configService.getConfigs(user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createConfig(
    @Body() body: CreateConfigDto,
    @CurrentUser() user: UserDetails,
  ): Promise<RedditConfig> {
    return this.configService.createConfig(body, user);
  }

  @Put()
  updateConfig(@Body() body: CreateConfigDto) {
    return this.configService.updateConfig(body);
  }

  @Put('/:id')
  updateMessage(@Param('id') id: string, @Body() body: any) {
    return this.configService.updateMessage(id, body.pmBody);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  deleteConfig(@Param('id') id: string, @CurrentUser() user: UserDetails) {
    return this.configService.deleteConfig(id, user);
  }
}
