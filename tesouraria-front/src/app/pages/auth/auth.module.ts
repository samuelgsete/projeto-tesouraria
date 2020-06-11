import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { routing } from 'src/app/app.routing';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  exports: [AuthComponent],
})
export class AuthModule { }
