import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthUserGuard } from './shared/auth/auth-user.guard';
import { TreasuryComponent } from './pages/treasury/treasury.component';
import { TransactionsComponent } from './pages/treasury/transactions/transactions.component';
import { ReportComponent } from './pages/treasury/report/report.component';
import { HistoricComponent } from './pages/treasury/historic/historic.component';
import { CreateUserComponent } from './pages/user/create-user/create-user.component';
import { ConfirmAccountComponent } from './pages/user/create-user/confirm-account/confirm-account.component';
import { AuthUserComponent } from './pages/user/auth-user/auth-user.component';
import { DashboardUserComponent } from './pages/user/dashboard-user/dashboard-user.component';
import { RecoverAccountComponent } from './pages/user/recover-account/recover-account.component';
import { ConfirmRecoverComponent } from './pages/user/recover-account/confirm-recover/confirm-recover.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: AuthUserComponent },
            { path: 'home', component: TreasuryComponent, canActivate: [AuthUserGuard] },
            { path: 'transactions/:id', component: TransactionsComponent, canActivate: [AuthUserGuard] },
            { path: 'report/:id', component: ReportComponent, canActivate: [AuthUserGuard] },
            { path: 'historic/:id', component: HistoricComponent, canActivate: [AuthUserGuard] },
            { path: 'user/dashboard', component: DashboardUserComponent, canActivate: [AuthUserGuard] },
            { path: 'user/create', component: CreateUserComponent },
            { path: 'confirm/account', component: ConfirmAccountComponent },
            { path: 'user/auth', component: AuthUserComponent },
            { path: 'user/recover', component: RecoverAccountComponent },
            { path: 'confirm/recover', component: ConfirmRecoverComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}