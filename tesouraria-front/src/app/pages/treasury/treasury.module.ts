import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { TreasuryComponent } from './treasury.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TreasuryService } from 'src/app/shared/services/treasury.service';
import { ReportComponent } from './report/report.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { HistoricComponent } from './historic/historic.component';
import { AccountComponent } from './account/account.component';
import { UserService } from 'src/app/shared/services/user.service';
import { IncomeComponent } from './income/income.component';
import { ChartsTreasuryComponent } from './charts-treasury/charts-treasury.component';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { ReportService } from 'src/app/shared/services/report.service';
import { HistoricService } from 'src/app/shared/services/historic.service';
import { ReportChartComponent } from './report/report-chart/report-chart.component';
import { TransactionsChartComponent } from './transactions/transactions-chart/transactions-chart.component';

@NgModule({
  declarations: [
    TreasuryComponent,
    TransactionsComponent,
    ReportComponent,
    HistoricComponent,
    AccountComponent,
    IncomeComponent,
    ChartsTreasuryComponent,
    ReportChartComponent,
    TransactionsChartComponent
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
    TreasuryService, 
    TransactionsService,
    ReportService,
    HistoricService,
    UserService
  ]
})
export class TreasuryModule { }