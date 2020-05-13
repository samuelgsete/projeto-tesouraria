
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { TesourariaModule } from './pages/tesouraria/tesouraria.module';
import { routing } from './app.routing';
import { AuthModule } from './pages/auth/auth.module';
import { UsuarioService } from './shared/services/usuario.service';
import { AuthGuard } from './pages/auth/auth.guard';
import { AuthInterceptor } from './pages/auth/auth.interceptor';
import { PaginationService } from './shared/pagination/pagination.service';

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
    TesourariaModule,
    AuthModule,
    routing,
  ],
  providers: [
    AuthGuard, 
    UsuarioService,
    PaginationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
