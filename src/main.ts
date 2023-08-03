import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const port = configService.get('PORT') ?? 3000;
  await app.listen(port, () =>
    Logger.log(`Server is listening on port ${port}`),
  );
}
bootstrap();
