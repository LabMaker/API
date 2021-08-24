import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import * as connectRedis from 'connect-redis';
import { redis } from './redis';

// import * as discordStrategy from './strategies/discordstrategy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const RedisStore = connectRedis(session);
  // var RedisStore = require('connect-redis')(session);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(
    session({
      store: new RedisStore({ client: redis }),
      cookie: {
        maxAge: 60000 * 60 * 24,
      },
      secret: 'mysecret',
      saveUninitialized: false,
      resave: false,
    }),
  );

  //passport
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
