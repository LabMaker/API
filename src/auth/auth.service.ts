import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto';

// eslint-disable-next-line
const users = require('../users.json');

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  signinLocal(dto: AuthDto) {
    //Revtreive user
    const user = users.find((_user) => _user.email === dto.email);

    if (!user) throw new UnauthorizedException('Credentials incorrect 1');
    if (user.password !== dto.password)
      throw new UnauthorizedException('Credentials incorrect 2');

    return this.signUser(user.id, user.email, 'user');
  }

  signupLocal(dto: AuthDto) {}

  signUser(userId: number, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      type: type,
    });
  }
}
