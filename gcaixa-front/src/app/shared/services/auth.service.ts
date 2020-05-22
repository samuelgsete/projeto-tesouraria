import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../modelos/User';
import { Router } from '@angular/router';

@Injectable()
export class AuthService  {

  private urlBase: string = 'http://localhost:3000/auth/login';

  public constructor(private http: HttpClient,private router: Router) {}

  public login(user: User): Observable<any> {
    return this.http.post<any>(this.urlBase, user);
  }

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('name_user');
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
