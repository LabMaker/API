import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { UserDetails } from '../auth/userDetails.dto';
import { CurrentUser } from '../utils/getUser.decorator';
import { JwtAuthGuard } from '../utils/guards/Jwt.guard';
import { UserDto } from './dto/User.dto';
import { IUser } from './user.interface';

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private readonly userService: IUser) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  getUser(@CurrentUser() user: UserDetails): Promise<UserDto> {
    console.log(user);
    return this.userService.getUser(user);
  }
}