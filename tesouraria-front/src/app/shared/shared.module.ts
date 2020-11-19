import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";
import { ToastrModule } from 'ngx-toastr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { PhonePipe } from './pipes/phone.pipe';
import { DateShowPipe } from './pipes/date-show.pipe';

@NgModule({
  declarations: [
    PhonePipe,
    DateShowPipe 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    NgxDatatableModule ,
    MatFormFieldModule,
    MatInputModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatDatepickerModule, 
    MatNativeDateModule
  ],
  exports: [
    ReactiveFormsModule,
    MDBBootstrapModule,
    NgxDatatableModule,
    MatFormFieldModule,
    MatInputModule,
    NgxCurrencyModule,
    ToastrModule,
    NgxMaskModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PhonePipe,
    DateShowPipe 
  ]
})
export class SharedModule { }