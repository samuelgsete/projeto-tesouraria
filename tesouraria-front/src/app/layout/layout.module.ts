import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu/menu.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../shared/services/auth.service';
import { FooterComponent } from './footer/footer.component';
import { routing } from '../app.routing';

@NgModule({
  declarations: [
    MenuComponent, 
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  exports: [
    MenuComponent,
    FooterComponent
  ],
  providers: [
    AuthService 
  ]
})
export class LayoutModule { }
