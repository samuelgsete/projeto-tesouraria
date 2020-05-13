import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";
import { ToastrModule } from 'ngx-toastr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TextMaskModule } from 'angular2-text-mask';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { DateFormatPipe } from './pipes/date-format.pipe';
import { PaginationModule } from './pagination/pagination.module';

@NgModule({
  declarations: [
    DateFormatPipe,
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
    MatSelectModule,
    MatExpansionModule,
    MatProgressBarModule,
    PaginationModule
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
    MatSelectModule,
    MatExpansionModule,
    MatProgressBarModule,
    PaginationModule
  ]
})
export class SharedModule { }
