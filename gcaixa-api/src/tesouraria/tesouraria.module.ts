import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TesourariaController } from './tesouraria.controller';
import { TesourariaService } from './tesouraria.service';
import { Tesouraria } from 'src/shared/models/treasury.entity';
import { Saida } from 'src/shared/models/expense.entity';
import { Entrada } from 'src/shared/models/recipe.entity';
import { Credito } from 'src/shared/models/credit.entity';
import { Contagem } from 'src/shared/models/inventory.entity';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    Tesouraria, 
    Saida,
    Entrada,
    Credito,
    Contagem
  ])],
  controllers: [ TesourariaController ],
  providers: [ TesourariaService, TransactionsService ]
})
export class TesourariaModule {}
