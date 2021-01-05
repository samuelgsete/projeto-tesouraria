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
import { HomeComponent } from './pages/home/home.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'home', component: HomeComponent },
            { path: 'treasury', component: TreasuryComponent, canActivate: [AuthUserGuard] },
            { path: 'treasury/:id/transactions', component: TransactionsComponent, canActivate: [AuthUserGuard] },
            { path: 'treasury/:id/report', component: ReportComponent, canActivate: [AuthUserGuard] },
            { path: 'treasury/:id/historic', component: HistoricComponent, canActivate: [AuthUserGuard] },
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