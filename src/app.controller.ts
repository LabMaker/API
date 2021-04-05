import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService, TypeTest } from './app.service';

export class MessageDto {
  content: string;
  submittedBy: string;
}

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
}
