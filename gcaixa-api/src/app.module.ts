import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CaixaModule } from './caixa/caixa.module';
import { Caixa } from './shared/models/caixa.entity';
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
      database: 'gcaixadb',
      entities: [
        Caixa, 
        Saida,
        Entrada,
        Credito,
        Contagem
      ],
      synchronize: true,
    }),
    CaixaModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
