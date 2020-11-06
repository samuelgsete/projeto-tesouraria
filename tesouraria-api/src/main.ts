import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { HttpExceptionFilter } from './shared/exceptions/http-exception.filter';
import { PersistenceExceptionFilter } from './shared/exceptions/persistense-exception.filter';
import { GenericExceptionFilter } from './shared/exceptions/generic-exception.filter';
import { IsCreatedExceptionFeilter } from './shared/exceptions/is-created-exception.filter';
import { ValidationExceptionFilter } from './shared/exceptions/validation-exception.filter';
import { ValidationPipe } from './shared/pipes/validation-custom.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(
    new GenericExceptionFilter(),
    new HttpExceptionFilter(), 
    new PersistenceExceptionFilter(),
    new IsCreatedExceptionFeilter(),
    new ValidationExceptionFilter()
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();