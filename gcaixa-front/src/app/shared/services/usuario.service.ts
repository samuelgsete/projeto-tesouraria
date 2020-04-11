import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from '../modelos/Usuario';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService  {

  private urlBase: string = 'http://localhost:3000/auth/login';

  public constructor(private http: HttpClient,private router: Router ) {}

  public login(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.urlBase, usuario);
  }

  public logout() {
    localStorage.removeItem('id_token');
    this.router.navigateByUrl('/login');
  }

  public userIsAutenticate(): boolean {
    const idToken = localStorage.getItem("id_token");
    if(idToken) {
      return true;
    }
    return false;
  }
}
