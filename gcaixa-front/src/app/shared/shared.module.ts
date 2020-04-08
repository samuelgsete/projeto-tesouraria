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
import { DateFormatPipe } from './pipes/date-format.pipe';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    DateFormatPipe
  ],
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
    MatSelectModule
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
    DateFormatPipe,
    MatSelectModule
  ],
})
export class SharedModule { }
