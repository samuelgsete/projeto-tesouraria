import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/shared/modelos/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public f: FormGroup;

  constructor( 
                private _fb: FormBuilder, 
                private router: Router,  
                private servico: AuthService, 
                private toastr: ToastrService
  ) { }
  
  public fazerLogin(user: User) {
    this.servico.login(user).subscribe( res => {
      localStorage.setItem("id_token", res.access_token);
      localStorage.setItem('name_user', res.name_user);
      this.router.navigateByUrl('/home');
    }, err => {
      this.messageError(err);
      this.f.reset();
    });
  }

  public messageError(erro: any) {
    if(erro.status == 0) {
      this.toastr.error('Tente mais tarde', 'Servidor indisponível', { progressBar: true });
    }
    if(erro.status == 401) {
      this.toastr.error('Login ou senha inválidos', 'ERRO', { progressBar: true });
    }
  }

  public fazerLogout() {
    this.servico.logout();
  }

  ngOnInit() {
    this.f = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]]
    });
  }
}
