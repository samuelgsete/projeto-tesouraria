import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { TesourariaComponent } from './tesouraria.component';
import { MovimentacoesComponent } from './movimentacoes/movimentacoes.component';
import { TesourariaService } from 'src/app/shared/services/tesouraria.service';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { RelatorioService } from 'src/app/shared/services/relatorio.service';
import { LayoutModule } from 'src/app/layout/layout.module';
import { HistoricoComponent } from './historico/historico.component';
import { ContagemComponent } from './contagem/contagem.component';

@NgModule({
  declarations: [
    TesourariaComponent,
    MovimentacoesComponent,
    RelatorioComponent,
    HistoricoComponent,
    ContagemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule
  ],
  exports: [
    TesourariaComponent
  ],
  providers: [
    TesourariaService,
    RelatorioService
  ]
})
export class TesourariaModule { }
