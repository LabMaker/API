import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './typeorm';

@Module({
  imports: [
    BotModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '213.48.11.122',
      port: 3306,
      username: 'reditBot',
      password: 'V8RiyIl6L2rEzAKO3Ip1daTIhITO4e',
      database: 'redit_bot',
      entities: entities,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
