import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

async function bootstrap() {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Personal Finance API')
    .setDescription('API to track personal finance')
    .setVersion('1.0.0')
    .addTag('finance')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  const port = process.env.NODE_PORT || 3000
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port);
  logger.log(`App listen on port ${port}`)
}
bootstrap();
