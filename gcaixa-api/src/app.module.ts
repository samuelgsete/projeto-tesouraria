import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TesourariaModule } from './tesouraria/tesouraria.module';
import { Tesouraria } from './shared/models/treasury.entity';
import { Saida } from './shared/models/expense.entity';
import { Entrada } from './shared/models/recipe.entity';
import { Credito } from './shared/models/credit.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { Contagem } from './shared/models/inventory.entity';
import { User } from './shared/models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'tesourariadb',
      entities: [
        Tesouraria, 
        Saida,
        Entrada,
        Credito,
        Contagem,
        User
      ],
      synchronize: true,
    }),
    TesourariaModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
