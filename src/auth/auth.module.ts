import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/UserSchema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DiscordStrategy } from './strategy/discord.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'mysecret',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [DiscordStrategy, AuthService, JwtStrategy],
})
export class AuthModule {}
