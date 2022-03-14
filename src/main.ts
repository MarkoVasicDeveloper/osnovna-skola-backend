/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets('../lessons', {
    prefix: '/assets/lessons',
  });
  await app.listen(3000);
}
bootstrap();
