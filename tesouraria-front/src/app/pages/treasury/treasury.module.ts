import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { TreasuryComponent } from './treasury.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TreasuryService } from 'src/app/shared/services/treasury.service';
import { ReportComponent } from './report/report.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { HistoricComponent } from './historic/historic.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AccountComponent } from './account/account.component';
import { UserService } from 'src/app/shared/services/user.service';
import { IncomeComponent } from './income/income.component';
import { ChartsTreasuryComponent } from './charts-treasury/charts-treasury.component';

@NgModule({
  declarations: [
    TreasuryComponent,
    TransactionsComponent,
    ReportComponent,
    HistoricComponent,
    InventoryComponent,
    AccountComponent,
    IncomeComponent,
    ChartsTreasuryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
  ],
  exports: [
    TreasuryComponent
  ],
  providers: [
    TreasuryService, UserService
  ]
})
export class TreasuryModule { }
