import { JwtService } from '@nestjs/jwt';
import { UserDetails } from './userDetails.dto';
import { Response, Request } from 'express';
import { User } from '.prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async validateUser(details: UserDetails) {
    const { id } = details;

    const userData = {
      id: details.id,
      username: details.username,
      discriminator: details.discriminator,
      avatar: details.avatar,
      accessToken: details.accessToken,
      refreshToken: details.refreshToken,
      tokenVersion: details.tokenVersion,
    };

    let user = await this.prismaService.user.upsert({
      where: {
        id,
      },
      update: userData,
      create: userData,
    });

    return this.createRefreshToken(user, 'user');
  }

  async createBotToken() {
    const botToken = this.createBotAccessToken();
    this.logger.error(botToken); //Logged As We Dont want to expose this to the public
    //In the future it will be re-writing to check for Auth and make the Token less powerful than it is (CUrrently can do anything)
    return;
  }

  async refreshToken(res: Response, req: Request) {
    const token = req.cookies.jid;
    this.logger.log(`Refresh Token - Auth Service ${token}`);

    if (!token) {
      this.logger.warn(`Empty Token`);
      return res.send({ ok: false, accessToken: '' });
    }

    let payload: any = null;

    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (err) {
      this.logger.error(err);
      return res.send({ ok: false, accessToken: '' });
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user || user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }

    user.tokenVersion = user.tokenVersion + 1;

    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: user,
    });

    res.cookie('jid', this.createRefreshToken(updatedUser, 'user'), {
      sameSite: 'none',
      httpOnly: true,
      secure: true,
      path: '/auth/refresh_token',
    });

    return res.send({
      ok: true,
      accessToken: this.createAccessToken(updatedUser, 'user'),
    });
  }

  createRefreshToken(user: User, type: string) {
    return this.jwtService.sign(
      {
        sub: user.id,
        type: type,
        tokenVersion: user.tokenVersion,
      },
      { secret: process.env.JWT_REFRESH_TOKEN, expiresIn: '7d' },
    );
  }

  createAccessToken(user: User, type: string) {
    return this.jwtService.sign(
      {
        sub: user.id,
        username: user.username,
        discriminator: user.discriminator,
        type: type,
      },
      { secret: process.env.JWT_TOKEN, expiresIn: '15m' },
    );
  }

  private createBotAccessToken() {
    return this.jwtService.sign(
      {
        sub: '10019',
        type: 'Bot',
      },
      { secret: process.env.JWT_TOKEN, expiresIn: '1y' },
    );
  }
}
