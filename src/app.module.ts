import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscordModule } from './discord/discord.module';
import { RedditModule } from './reddit/reddit.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PayModule } from './pay/pay.module';

let envFilePath = '.env.development';

if (process.env.ENVIRONMENT === 'PRODUCTION') {
  envFilePath = '.env';
}

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    DiscordModule,
    RedditModule,
    AuthModule,
    UserModule,
    PayModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
