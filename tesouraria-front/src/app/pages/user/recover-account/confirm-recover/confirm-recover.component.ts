import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-confirm-recover',
  templateUrl: './confirm-recover.component.html',
  styleUrls: ['./confirm-recover.component.scss']
})
export class ConfirmRecoverComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean = false;
  public email: string;
  public name: string;

  public constructor(
                      private readonly _fb: FormBuilder, 
                      private readonly router: Router,
                      private readonly toastr: ToastrService,
                      private readonly service: UserService
                    ) 
  { 
    this.email = localStorage.getItem('email');
    this.name = localStorage.getItem('name');

    if(!this.email || !this.name) {
      this.router.navigateByUrl('user/recover');
    }
  }

  public updateUser(value: any) {
    this.loading = true;
    this.service.finalizeRecover(value.newUsername, value.newPassword, value.code).subscribe( res => {
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      this.toastr.success('Sua senha foi atualizada', 'Tudo ok', { progressBar: true, positionClass: 'toast-bottom-center' });
      this.router.navigateByUrl('/user/login');
    }, 
    erro => {
      this.errorMessage(erro);
    }).add( () => {
      this.loading = false;
    });
  }

  public resendCode() {
    this.loading = true;
    this.service.resendCode(this.email).subscribe( res => {
      this.toastr.info('Código reenviado', 'Tudo ok', { progressBar: true, positionClass: 'toast-bottom-center'});
    },
    err => {
      this.errorMessage(err);
    }).add( () => {
      this.loading = false;
    });  
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
    if(response.status == 0) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true, positionClass: 'toast-bottom-center' });
    }
    else {
      this.toastr.error(error.message, 'ERRO', { progressBar: true, positionClass: 'toast-bottom-center' });
    }
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      newUsername: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      newPassword: ['', [Validators.required, Validators.required, Validators.minLength(4), Validators.maxLength(30)]]
    });
  }
}