
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { TreasuryModule } from './pages/treasury/treasury.module';
import { AppRoutingModule } from './app.routing.module';
import { AuthService } from './shared/services/auth.service';
import { AuthUserGuard } from './shared/auth/auth-user.guard';
import { AuthUserInterceptor } from './shared/auth/auth-user.interceptor';
import { PaginationService } from './shared/pagination/pagination.service';
import { UserModule } from './pages/user/user.module';
import { IncomeService } from './pages/treasury/income/income.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    TreasuryModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [
    AuthUserGuard, 
    AuthService,
    PaginationService,
    IncomeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthUserInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
