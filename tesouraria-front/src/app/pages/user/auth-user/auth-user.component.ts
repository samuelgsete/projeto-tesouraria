import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";

import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.entity';

const SERVER_OFFLINE = 0;

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.scss']
})
export class AuthUserComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean = false;

  public constructor(
                      private readonly _fb: FormBuilder, 
                      private readonly router: Router,
                      private readonly toastr: ToastrService,
                      private readonly service: AuthService
                    ) { }

  public toNewUser() {
    this.router.navigateByUrl('/user/create');
  }

  public signIn(user: User) {
    this.loading = true;
    this.service.loginUser(user).subscribe( res => {
      this.decodePayloadJWT(res.access_token);
      this.router.navigateByUrl('/home');
      this.toastr.success('Você está autenticado', 'Tudo ok', { progressBar: true, positionClass: 'toast-bottom-center' });
    },
    err => {
      this.errorMessage(err);
    }).add( () => {
      this.loading = false;
    });
  }

  public decodePayloadJWT(token: any): any {
    localStorage.setItem("id_token", token);
    try {
      const result = jwt_decode(token);
      localStorage.setItem('name_user', result.name);
      localStorage.setItem('user_id', result.userid);
      localStorage.setItem('user', result.user);
    }catch (Error) {
      console.log(Error);
      return null;
    }
  }

  public hideOrShowPassword(pass, icon) {   
    if(icon._elementRef.nativeElement.firstChild.data == 'visibility') {
      pass.type = 'password'
      icon._elementRef.nativeElement.firstChild.data = 'visibility_off';
    }
    else {
      icon._elementRef.nativeElement.firstChild.data = 'visibility';
      pass.type = 'text';
    }
  }

  private errorMessage(response: any) {
    const error = response.error;
    if(response.status == SERVER_OFFLINE) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true, positionClass: 'toast-bottom-center' });
    }
    else {
      this.toastr.error(response.error.details, 'ERRO', { progressBar: true, positionClass: 'toast-bottom-center' });
    }
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]]
    });
  }
}