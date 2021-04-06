import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
  app.enableCors();
=======
>>>>>>> 7ece9823be801c95b51ed282dcf9f58eef5b35fe
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
