import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/shared/models/user.entity';
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
      localStorage.setItem('user_id', res.user_id);
      this.router.navigateByUrl('/home');
    }, err => {
      this.messageError(err);
    });
  }

  public messageError(response: any) {
    if(response.status == 0) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true });
    }
    if(response.status == 401) {
      this.toastr.error(response.error.details, 'ERRO', { progressBar: true });
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
