import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { HttpExceptionFilter } from './shared/exceptions/http-exception.filter';
import { PersistenceExceptionFilter } from './shared/exceptions/persistense-exception.filter';
import { GenericExceptionFilter } from './shared/exceptions/generic-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  app.useGlobalFilters(
    new GenericExceptionFilter(),
    new HttpExceptionFilter(), 
    new PersistenceExceptionFilter(),
  );
  await app.listen(3000);
}
bootstrap();
