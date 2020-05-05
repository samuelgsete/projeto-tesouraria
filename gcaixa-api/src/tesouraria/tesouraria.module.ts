import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TesourariaController } from './tesouraria.controller';
import { TesourariaService } from './tesouraria.service';
import { Tesouraria } from 'src/shared/models/tesouraria.entity';
import { Saida } from 'src/shared/models/saida.entity';
import { Entrada } from 'src/shared/models/entrada.entity';
import { Credito } from 'src/shared/models/credito.entity';
import { RelatorioController } from './relatorio/relatorio.controller';
import { RelatorioService } from './relatorio/relatorio.service';
import { Contagem } from 'src/shared/models/contagem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Tesouraria, 
    Saida,
    Entrada,
    Credito,
    Contagem
  ])],
  controllers: [TesourariaController, RelatorioController],
  providers: [TesourariaService, RelatorioService]
})
export class TesourariaModule {}
