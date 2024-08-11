import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';

const port = process.env.PORT || 4000;
console.log(
  `Launching NestJS app on port ${port}, URL: http://0.0.0.0:${port}`,
);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '2mb' }));
  app.enableCors();
  await app.listen(port);
}
bootstrap();
