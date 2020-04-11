
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { CaixaModule } from './pages/caixa/caixa.module';
import { routing } from './app.routing';
import { AuthModule } from './pages/auth/auth.module';
import { UsuarioService } from './shared/services/usuario.service';
import { AuthGuard } from './pages/auth/auth.guard';
import { AuthInterceptor } from './pages/auth/auth.interceptor';

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
    CaixaModule,
    AuthModule,
    routing,
  ],
  providers: [
    AuthGuard, 
    UsuarioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
