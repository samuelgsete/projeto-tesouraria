import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { TesourariaComponent } from './tesouraria.component';
import { MovimentacoesComponent } from './movimentacoes/movimentacoes.component';
import { TesourariaService } from 'src/app/shared/services/tesouraria.service';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { HistoricoComponent } from './historico/historico.component';
import { ContagemComponent } from './contagem/contagem.component';
import { AccountComponent } from './account/account.component';
import { UserService } from 'src/app/shared/services/user.service';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [
    TesourariaComponent,
    MovimentacoesComponent,
    RelatorioComponent,
    HistoricoComponent,
    ContagemComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
  ],
  exports: [
    TesourariaComponent
  ],
  providers: [
    TesourariaService, UserService
  ]
})
export class TesourariaModule { }
