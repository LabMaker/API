import { Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { ConfigController } from './controllers/config.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RedditConfig,
  RedditConfigSchema,
} from '../schemas/RedditConfigSchema';
import { LogsService } from './services/logs.service';
import { LogsController } from './controllers/logs.controller';
import { Log, LogSchema } from '../schemas/LogSchema';
import { User, UserSchema } from '../schemas/UserSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RedditConfig.name, schema: RedditConfigSchema },
      { name: Log.name, schema: LogSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    {
      provide: 'REDDIT_CONFIG_SERVICE',
      useClass: ConfigService,
    },
    {
      provide: 'LOG_SERVICE',
      useClass: LogsService,
    },
  ],
  controllers: [ConfigController, LogsController],
})
export class RedditModule {}
