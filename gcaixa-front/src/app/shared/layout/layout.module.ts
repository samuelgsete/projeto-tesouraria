import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { routing } from 'src/app/app.routing';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    routing
  ],
  exports: [
    LayoutComponent
  ],
  providers: []
})
export class LayoutModule { }
