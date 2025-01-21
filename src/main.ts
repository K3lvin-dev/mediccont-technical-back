import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Permite todas as origens (não recomendado em prd, nesse caso configure os clients para o CORS)
  app.enableCors();

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API Example')
    .setDescription('Documentação da API Example')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
