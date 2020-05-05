import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TesourariaModule } from './tesouraria/tesouraria.module';
import { Tesouraria } from './shared/models/tesouraria.entity';
import { Saida } from './shared/models/saida.entity';
import { Entrada } from './shared/models/entrada.entity';
import { Credito } from './shared/models/credito.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Contagem } from './shared/models/contagem.entity';

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
        Contagem
      ],
      synchronize: true,
    }),
    TesourariaModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
