import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as pakage from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentBuilder = new DocumentBuilder()
    .setTitle(pakage.name)
    .setDescription(pakage.description)
    .setVersion(pakage.version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.APP_PORT);
}
bootstrap();
