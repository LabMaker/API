import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({ origin: 'http://localhost:3001', credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(passport.initialize());
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
