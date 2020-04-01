import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders} from '@angular/core';

import { CaixaComponent } from './pages/caixa/caixa.component';
import { MovimentacoesComponent } from './pages/caixa/movimentacoes/movimentacoes.component';

const APP_ROUTES: Routes = [
    { path: '', component: CaixaComponent },
    { path: 'home', component: CaixaComponent },
    { path: 'movimentacoes/:id', component: MovimentacoesComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);