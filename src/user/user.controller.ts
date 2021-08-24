import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthenticatedGuard } from '../auth/guards';
import { CurrentUser } from '../discord/controllers/config.controller';
import { User } from '../schemas/UsersSchema';
import { IUser } from './user.interface';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userService: IUser,
  ) {}

  @Get('guilds')
  @UseGuards(AuthenticatedGuard)
  async getGuilds(@Req() request: Request, @CurrentUser() user: User) {
    console.log(user);
    return this.userService.fetchGuilds(user.accessToken);
  }
}
