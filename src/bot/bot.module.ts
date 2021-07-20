import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config, Logs, Payments } from 'src/typeorm';
import { BotController } from './controllers/bot/bot.controller';
import { BotService } from './service/bot/bot.service';

@Module({
  imports: [TypeOrmModule.forFeature([Config, Logs, Payments])],
  controllers: [BotController],
  providers: [
    {
      provide: 'BOT_SERVICE',
      useClass: BotService,
    },
  ],
})
export class BotModule {}
