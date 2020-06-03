import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders} from '@angular/core';

import { TesourariaComponent } from './pages/tesouraria/tesouraria.component';
import { MovimentacoesComponent } from './pages/tesouraria/movimentacoes/movimentacoes.component';
import { ReportComponent } from './pages/tesouraria/report/report.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './pages/auth/auth.guard';
import { HistoricoComponent } from './pages/tesouraria/historico/historico.component';
import { ContagemComponent } from './pages/tesouraria/contagem/contagem.component';
import { CreateUserComponent } from './pages/user/create-user/create-user.component';
import { AccountComponent } from './pages/tesouraria/account/account.component';
import { PrintComponent } from './pages/tesouraria/report/print/print.component';


const APP_ROUTES: Routes = [
    { path: 'home', component: TesourariaComponent, canActivate: [AuthGuard] },
    { path: 'movimentacoes/:id', component: MovimentacoesComponent, canActivate: [AuthGuard] },
    { path: 'relatorio/:id', component: ReportComponent, canActivate: [AuthGuard] },
    { path: 'imprimir/:id', component: PrintComponent, canActivate: [AuthGuard] },
    { path: 'historico/:id', component: HistoricoComponent, canActivate: [AuthGuard] },
    { path: 'contagem/:id', component: ContagemComponent, canActivate: [AuthGuard] },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
    { path: 'login', component: AuthComponent },
    { path: 'user/create', component: CreateUserComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);