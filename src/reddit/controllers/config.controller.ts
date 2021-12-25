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
import { RedditConfig } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/Jwt.guard';
import { UserDetails } from '../../auth/userDetails.dto';
import { CurrentUser } from '../../utils/getUser.decorator';
import {
  CreateConfigDto,
  UpdateConfigDto,
} from '../dtos/create-redditconfig.dto';
import { IRedditConfig } from '../interfaces/config.interface';

@Controller('reddit/config')
export class ConfigController {
  constructor(
    @Inject('REDDIT_CONFIG_SERVICE')
    private readonly configService: IRedditConfig,
  ) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getConfig(@Param('id') id: number): Promise<RedditConfig> {
    return this.configService.getConfig(id);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  getAll(@CurrentUser() user: UserDetails): Promise<RedditConfig[]> {
    return this.configService.getConfigs(user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createConfig(@Body() body: CreateConfigDto): Promise<RedditConfig> {
    return this.configService.createConfig(body);
  }

  @Put()
  updateConfig(@Body() body: UpdateConfigDto) {
    return this.configService.updateConfig(body);
  }

  @Put('/:id')
  updateMessage(@Param('id') id: number, @Body() body: any) {
    return this.configService.updateMessage(id, body.pmBody);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  deleteConfig(@Param('id') id: number) {
    return this.configService.deleteConfig(id);
  }

  @Get('image/profile')
  getProfile(): Promise<any> {
    return this.configService.getProfile('chikybacon');
  }
}
