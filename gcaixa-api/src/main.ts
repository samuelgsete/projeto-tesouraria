import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { HttpExceptionFilter } from './shared/exceptions/http-exception.filter';
import { PersistenceExceptionFilter } from './shared/exceptions/persistense-exception.filter';
import { GenericaExceptionsFilter } from './shared/exceptions/generic-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true });
  app.useGlobalFilters(
    new HttpExceptionFilter(), 
    new PersistenceExceptionFilter(),
    new GenericaExceptionsFilter()
  );
  await app.listen(3000);
}
bootstrap();
