import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { User } from '../models/user.entity';
import { Router } from '@angular/router';

@Injectable()
export class AuthService  {

  private urlBase: string = 'https://tesouraria-core.herokuapp.com/auth/login';

  public constructor(
                      private http: HttpClient, 
                      private router: Router,
                      private toastr: ToastrService
                    ) {}

  public loginUser(user: User): Observable<any> {
    return this.http.post<any>(this.urlBase, user);
  }

  public logoutUser() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('name_user');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/user/auth');
    this.toastr.success('Desconectado com sucesso', 'Tudo ok!', { progressBar: true, positionClass: 'toast-bottom-center' });
  }

  public userIsAutenticate(): boolean {
    const idToken = localStorage.getItem("id_token");
    if(idToken) {
      return true;
    }
    return false;
  }
}
