import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgxCurrencyModule } from "ngx-currency";
import { ToastrModule } from 'ngx-toastr';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatMenuModule} from '@angular/material/menu';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    NgxDatatableModule ,
    MatFormFieldModule,
    MatInputModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TextMaskModule,
  ],
  exports: [
    ReactiveFormsModule,
    MDBBootstrapModule,
    NgxDatatableModule,
    MatFormFieldModule,
    MatInputModule,
    NgxCurrencyModule,
    ToastrModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TextMaskModule,
  ],
})
export class SharedModule { }
