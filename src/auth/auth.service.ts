import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/UserSchema';
import { UserDetails } from './userDetails.dto';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userRepo: Model<UserDocument>,
  ) {}

  async validateUser(details: UserDetails) {
    const { _id } = details;
    const user = await this.userRepo.findById(_id);

    if (user) {
      await this.userRepo.findByIdAndUpdate(_id, details, {
        new: true,
        useFindAndModify: false,
      });
    } else {
      this.createUser(details);
    }
    console.log(details.tokenVersion);
    const refreshToken = this.createRefreshToken(user, 'user');
    console.log(refreshToken);
    // console.log(jwt);

    return refreshToken;
  }

  async createUser(details: UserDetails) {
    const createdUser = new this.userRepo({
      ...details,
    });
    return await createdUser.save();
  }

  async findUser(discordId: string): Promise<User | undefined> {
    return await this.userRepo.findOne({ discordId });
  }

  async refreshToken(res: Response, req: Request) {
    const token = req.cookies.jid;
    console.log(token);

    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }
    let payload: any = null;
    try {
      payload = this.jwtService.verify(token, { secret: 'refreshSecret' });
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: '' });
    }

    const user: User = await this.userRepo.findById(payload.sub);
    console.log(user);

    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }

    user.tokenVersion = user.tokenVersion + 1;

    const updatedUser = await this.userRepo.findByIdAndUpdate(user._id, user, {
      new: true,
      useFindAndModify: false,
    });

    res.cookie('jid', this.createRefreshToken(updatedUser, 'user'), {
      httpOnly: true,
      path: '/auth/refresh_token',
    });

    return res.send({
      ok: true,
      accessToken: this.createAccessToken(updatedUser, 'user'),
    });
  }

  createRefreshToken(user: UserDetails, type: string) {
    return this.jwtService.sign(
      {
        sub: user._id,
        type: type,
        tokenVersion: user.tokenVersion,
      },
      { secret: 'refreshSecret', expiresIn: '7d' },
    );
  }

  createAccessToken(user: UserDetails, type: string) {
    return this.jwtService.sign(
      {
        sub: user._id,
        username: user.username,
        discriminator: user.discriminator,
        type: type,
      },
      { secret: 'jwtSecret', expiresIn: '30s' },
    );
  }
}
