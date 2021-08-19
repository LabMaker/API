import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { Log } from '../../schemas/LogSchema';
import { CreateLogDto } from '../dtos/create-log.dto';
import { ILog } from '../interfaces/log.interface';

@Controller('reddit/log')
export class LogsController {
  constructor(@Inject('LOG_SERVICE') private readonly logService: ILog) {}

  @Get('/:id')
  getLog(@Param('id') nodeId: string): Promise<Log[]> {
    return this.logService.getLogs(nodeId);
  }

  @Get('submissions/:id')
  getSubmissions(@Param('id') nodeId: string): Promise<string[]> {
    return this.logService.getSubmissionIds(nodeId);
  }

  @Post()
  createLog(@Body() body: CreateLogDto): Promise<Log> {
    return this.logService.createLog(body);
  }
}
