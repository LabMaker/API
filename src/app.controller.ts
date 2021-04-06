import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService, LogsDto, TypeTest } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('submissions')
  getSubmissions(): TypeTest {
    return this.appService.getSubmissions();
  }

  @Post('ids')
  @HttpCode(204)
  insertId(@Body() body) {
    return this.appService.insertId(body);
  }

  @Get('logs')
  getLogs(): LogsDto {
    return this.appService.getLogs();
  }

  @Post('log')
  @HttpCode(204)
  insertLog(@Body() body) {
    return this.appService.insertLog(body);
  }

  @Get('config')
  getConfig() {
    return this.appService.getConfig();
  }

  @Post('updateConfig')
  updateConfig(@Body() body) {
    return this.appService.updateConfig(body);
  }
}
