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
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {}

  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: Response) {
    res.cookie('jid', res.req.user, {
      sameSite: 'none',
      httpOnly: true,
      secure: true,
      path: '/auth/refresh_token',
    });
    res.redirect(process.env.FRONT_END_URL);
  }

  @Post('refresh_token')
  refreshToken(@Res() res: Response, @Req() req: Request) {
    console.log(req.cookies);
    return this.authService.refreshToken(res, req);
  }

  @Get('bot_token')
  botToken() {
    return this.authService.createBotToken();
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
