import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
    new ValidationPipe({ transform: true, transformOptions: { groups: [ "pass" ] } })
  )

  const config = new DocumentBuilder()
    .setTitle('Project backend FullStack - Web!')
    .setDescription('See docs to use this backend!')
    .setVersion('1.0')
    .addTag('PKF-WEB')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();