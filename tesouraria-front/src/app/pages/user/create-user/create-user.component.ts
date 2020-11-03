import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user.entity';
import { UserService } from 'src/app/shared/services/user.service';
const SERVER_OFFLINE = 0;

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public form: FormGroup;
  public loading = false;

  public constructor(
                        private readonly router: Router, 
                        private readonly _fb: FormBuilder, 
                        private readonly toastr: ToastrService,
                        private readonly service: UserService
                    ) 
  { }

  public toLogin() {
    this.router.navigateByUrl('/user/auth');
  }

  public createUser(data: any) {
    this.loading = true;

    let user = new User({
      name: data.name,
      surname: data.surname,
      email: data.email,
      whatzapp: data.whatzapp,
      username: data.username,
      password: data.password
    });

    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
    
    this.service.create(user).subscribe( response => {
      this.router.navigateByUrl('/confirm/account');
    },
    erro => {
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      this.errorMessage(erro);
    }).add( () => {
      this.loading = false;
    });
  }

  public showPassword(input: any, icon: any) {
    input.type = 'text';
    icon._elementRef.nativeElement.firstChild.data = 'visibility';
  }

  public hidePassword(input: any, icon: any) {
    icon._elementRef.nativeElement.firstChild.data = 'visibility_off';
    input.type = 'password';
  }

  private errorMessage(response: any) {
    const error = response.error;
    if(response.status == SERVER_OFFLINE) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true, positionClass: 'toast-bottom-center' });
    }
    else {
      this.toastr.error(error.details, 'Ah não!', { progressBar: true, positionClass: 'toast-bottom-center' });
    }
  }

  ngOnInit() {
    this.form = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      surname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      whatzapp: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      password: ['', Validators.required]
    });
  }
}