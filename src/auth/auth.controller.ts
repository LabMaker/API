import {
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DiscordAuthGuard } from './guards/DiscordAuth.guard';
import { AuthenticationProvider } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthenticationProvider,
  ) {}

  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {}

  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: Response) {
    res.cookie('jid', res.req.user, {
      httpOnly: true,
      path: '/auth/refresh_token',
    });
    res.redirect('http://localhost:3001');
  }

  @Post('refresh_token')
  refreshToken(@Res() res: Response, @Req() req: Request) {
    return this.authService.refreshToken(res, req);
  }

  // @Post('local/signin')
  // signinLocal(@Body() dto: AuthDto) {
  //   return this.authService.signinLocal(dto);
  // }

  // @Post('local/signup')
  // signupLocal(@Body() dto: AuthDto) {
  //   return this.authService.signupLocal(dto);
  // }
}
