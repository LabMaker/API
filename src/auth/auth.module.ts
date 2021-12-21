import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaService } from '../prisma.service';
import { User, UserSchema } from '../schemas/UserSchema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DiscordStrategy } from './strategy/discord.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'mysecret',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  // exports: [{ provide: 'AUTH_SERVICE', useClass: AuthService }],
  controllers: [AuthController],
  providers: [
    DiscordStrategy,
    { provide: 'AUTH_SERVICE', useClass: AuthService },
    JwtStrategy,
    PrismaService,
  ],
})
export class AuthModule {}
