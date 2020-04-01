import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CaixaController } from './caixa.controller';
import { CaixaService } from './caixa.service';
import { Caixa } from 'src/shared/models/caixa.entity';
import { Saida } from 'src/shared/models/saida.entity';
import { Entrada } from 'src/shared/models/entrada.entity';
import { Credito } from 'src/shared/models/credito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Caixa, 
    Saida,
    Entrada,
    Credito,
  ])],
  controllers: [CaixaController],
  providers: [CaixaService]
})
export class CaixaModule {}
