import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  app.enable('trust proxy');

  app.use(cookieParser());
  app.enableCors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.use(passport.initialize());
  await app.listen(process.env.PORT || 3000);

  Logger.log(
    `Launched in ${process.env.ENVIRONMENT || 'DEV'} on ${await app.getUrl()}`,
    'Main',
  );
}

bootstrap();
