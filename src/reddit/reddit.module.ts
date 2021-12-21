import { Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { ConfigController } from './controllers/config.controller';
import { LogsService } from './services/logs.service';
import { LogsController } from './controllers/logs.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  providers: [
    {
      provide: 'REDDIT_CONFIG_SERVICE',
      useClass: ConfigService,
    },
    {
      provide: 'LOG_SERVICE',
      useClass: LogsService,
    },
    PrismaService,
  ],
  controllers: [ConfigController, LogsController],
})
export class RedditModule {}
