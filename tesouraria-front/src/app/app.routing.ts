import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders} from '@angular/core';

import { AuthGuard } from './pages/auth/auth.guard';
import { TreasuryComponent } from './pages/treasury/treasury.component';
import { TransactionsComponent } from './pages/treasury/transactions/transactions.component';
import { ReportComponent } from './pages/treasury/report/report.component';
import { AuthComponent } from './pages/auth/auth.component';
import { HistoricComponent } from './pages/treasury/historic/historic.component';
import { InventoryComponent } from './pages/treasury/inventory/inventory.component';
import { CreateUserComponent } from './pages/user/create-user/create-user.component';
import { AccountComponent } from './pages/treasury/account/account.component';
import { VerifyComponent } from './pages/user/create-user/verify/verify.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: TreasuryComponent, canActivate: [AuthGuard] },
    { path: 'transactions/:id', component: TransactionsComponent, canActivate: [AuthGuard] },
    { path: 'report/:id', component: ReportComponent, canActivate: [AuthGuard] },
    { path: 'historic/:id', component: HistoricComponent, canActivate: [AuthGuard] },
    { path: 'inventory/:id', component: InventoryComponent, canActivate: [AuthGuard] },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
    { path: 'login', component: AuthComponent },
    { path: 'user/create', component: CreateUserComponent },
    { path: 'user/verify', component: VerifyComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);