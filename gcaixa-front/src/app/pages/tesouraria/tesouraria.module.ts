import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { TesourariaComponent } from './tesouraria.component';
import { MovimentacoesComponent } from './movimentacoes/movimentacoes.component';
import { TesourariaService } from 'src/app/shared/services/tesouraria.service';
import { ReportComponent } from './report/report.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { HistoricoComponent } from './historico/historico.component';
import { ContagemComponent } from './contagem/contagem.component';
import { AccountComponent } from './account/account.component';
import { UserService } from 'src/app/shared/services/user.service';
import { PrintComponent } from './report/print/print.component';

@NgModule({
  declarations: [
    TesourariaComponent,
    MovimentacoesComponent,
    ReportComponent,
    HistoricoComponent,
    ContagemComponent,
    AccountComponent,
    PrintComponent
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
