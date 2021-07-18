import { Body, Controller, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { IBotService } from 'src/bot/service/bot/Bot';
import { configDetails, LogDetails } from 'src/bot/types/types';
import { Config } from 'src/typeorm';

@Controller('bot')
export class BotController {
  constructor(
    @Inject('BOT_SERVICE') private readonly botService: IBotService,
  ) {}

  @Get('submissions')
  getSubmissions(): Promise<Config[]> {
    return this.botService.getSubmissions();
  }

  @Get('logs')
  getLogs(): Promise<Config[]> {
    return this.botService.getLogs();
  }

  @Post('createLog')
  @HttpCode(200)
  createLog(@Body() LogDto): LogDetails {
    return this.botService.createLog(LogDto);
  }

  @Get('config')
  getConfig() {
    return this.botService.getConfig();
  }

  @Get('discordConfig')
  getDiscordConfig() {
    return this.botService.getDiscordConfig();
  }
  @Post('updateConfig')
  updateConfig(@Body() ConfigDto): configDetails {
    return this.botService.updateConfig(ConfigDto);
  }

  @Post('updateMessage')
  @HttpCode(200)
  updateMessage(@Body() Message): String {
    return this.botService.updateMessage(Message.pmBody);
  }
}
