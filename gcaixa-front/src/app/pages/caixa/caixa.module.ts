import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { CaixaComponent } from './caixa.component';
import { MovimentacoesComponent } from './movimentacoes/movimentacoes.component';
import { CaixaService } from 'src/app/shared/services/caixa.service';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { RelatorioService } from 'src/app/shared/services/relatorio.service';
import { LayoutModule } from 'src/app/layout/layout.module';
import { GraficoComponent } from './grafico/grafico.component';

@NgModule({
  declarations: [
    CaixaComponent,
    MovimentacoesComponent,
    RelatorioComponent,
    GraficoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule
  ],
  exports: [
    CaixaComponent
  ],
  providers: [
    CaixaService,
    RelatorioService
  ]
})
export class CaixaModule { }
