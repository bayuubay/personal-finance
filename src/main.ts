import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule);
  const port = process.env.NODE_PORT || 3000
  await app.listen(port);
  logger.log(`App listen on port ${port}`)
}
bootstrap();
