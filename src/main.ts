import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Permite todas as origens (não recomendado em prd, nesse caso configure os clients para o CORS)
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
