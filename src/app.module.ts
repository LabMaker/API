import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscordModule } from './discord/discord.module';
import { RedditModule } from './reddit/reddit.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://botuser:ZaCkbBpKRuNWq4QK@discord.6ajie.mongodb.net/LabMakerDev',
    ),
    DiscordModule,
    RedditModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
