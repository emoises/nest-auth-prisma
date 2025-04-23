/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT ?? 5000;
  console.log(`Working on port ${PORT}`);

  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:3000', // Permite o frontend
    credentials: true, // Permite envio de cookies e headers de autenticação
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );

  await app.listen(PORT);
}
bootstrap();
