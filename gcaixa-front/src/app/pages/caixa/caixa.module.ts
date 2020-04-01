import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CaixaComponent } from './caixa.component';
import { MovimentacoesComponent } from './movimentacoes/movimentacoes.component';
import { CaixaService } from 'src/app/shared/services/caixa.service';

@NgModule({
  declarations: [
    CaixaComponent,
    MovimentacoesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CaixaComponent
  ],
  providers: [
    CaixaService
  ]
})
export class CaixaModule { }
