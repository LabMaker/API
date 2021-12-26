import { Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { ConfigController } from './controllers/config.controller';
import { LogsService } from './services/logs.service';
import { LogsController } from './controllers/logs.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ConfigService, LogsService],
  controllers: [ConfigController, LogsController],
})
export class RedditModule {}
