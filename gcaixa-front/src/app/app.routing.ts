import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders} from '@angular/core';

import { CaixaComponent } from './pages/caixa/caixa.component';
import { MovimentacoesComponent } from './pages/caixa/movimentacoes/movimentacoes.component';
import { RelatorioComponent } from './pages/caixa/relatorio/relatorio.component';

const APP_ROUTES: Routes = [
    { path: '', component: CaixaComponent },
    { path: 'home', component: CaixaComponent },
    { path: 'movimentacoes/:id', component: MovimentacoesComponent },
    { path: 'relatorio/:id', component: RelatorioComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);