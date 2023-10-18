import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const cookieSession = require('cookie-session');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cookieSession({
   keys: ['paflexswot'],
 }));

//this work and the one in the app.module works too.. so any one w=you will like to use

  app.useGlobalPipes(
     new ValidationPipe({
      whitelist: true,
    }),
    );
  await app.listen(2001);
}
bootstrap();
