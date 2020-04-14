import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders} from '@angular/core';

import { CaixaComponent } from './pages/caixa/caixa.component';
import { MovimentacoesComponent } from './pages/caixa/movimentacoes/movimentacoes.component';
import { RelatorioComponent } from './pages/caixa/relatorio/relatorio.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './pages/auth/auth.guard';
import { GraficoComponent } from './pages/caixa/grafico/grafico.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: CaixaComponent, canActivate: [AuthGuard] },
    { path: 'movimentacoes/:id', component: MovimentacoesComponent, canActivate: [AuthGuard] },
    { path: 'relatorio/:id', component: RelatorioComponent, canActivate: [AuthGuard] },
    { path: 'grafico/:id', component: GraficoComponent, canActivate: [AuthGuard] },
    { path: 'login', component: AuthComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);