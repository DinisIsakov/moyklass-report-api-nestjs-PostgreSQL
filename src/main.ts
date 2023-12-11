import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Инициализация');

  process.on('unhandledRejection', (reason) => {
    logger.error(`Необработанное обещание: ${reason}`);
  });

  process.on('uncaughtException', (error) => {
    logger.error(`Необработанное исключение: ${error}`);
    process.exit(1);
  });

  const port = 3000;
  await app.listen(port);
  logger.log(`Приложение запущено на порту ${port}`);
}

bootstrap();
