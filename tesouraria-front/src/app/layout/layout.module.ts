import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app.routing.module';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../shared/services/auth.service';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    MenuComponent, 
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
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
