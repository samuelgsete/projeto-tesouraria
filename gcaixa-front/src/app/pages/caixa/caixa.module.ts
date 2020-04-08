import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CaixaComponent } from './caixa.component';
import { MovimentacoesComponent } from './movimentacoes/movimentacoes.component';
import { CaixaService } from 'src/app/shared/services/caixa.service';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { RelatorioService } from 'src/app/shared/services/relatorio.service';

@NgModule({
  declarations: [
    CaixaComponent,
    MovimentacoesComponent,
    RelatorioComponent
  ],
  imports: [
    CommonModule,
    SharedModule
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
