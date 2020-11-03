import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/shared/services/user.service';
const SERVER_OFFLINE = 0;

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {

  public code: FormControl;
  public email: string = '';
  public name: string = '';
  public loading: boolean = false;
 
  public constructor(
                      private readonly router: Router, 
                      private readonly toastr: ToastrService,
                      private readonly service: UserService
                    ) 
  { 
    this.email = localStorage.getItem('email');
    this.name = localStorage.getItem('name');

    if(this.email === null || this.name === null) {
      this.toNewUser();
    }
  }

  public toNewUser() {
    this.router.navigateByUrl('/user/create');
  }

  public finalizeRegistration() {
    this.loading = true;
    this.service.finalizeRegistration(this.code.value).subscribe( res => {
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      this.toastr.success('Criado com sucesso', 'Tudo ok', { progressBar: true, positionClass: 'toast-bottom-center' });
      this.router.navigateByUrl('/user/auth');
    },
    err => {
      console.log(err);
      this.errorMessage(err);
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

  private errorMessage(response: any) {
    const error = response.error;
    if(response.status == SERVER_OFFLINE) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true, positionClass: 'toast-bottom-center' });
    }
    else {
      this.toastr.error(error.details, 'Ah não!', { progressBar: true, positionClass: 'toast-bottom-center' });
    }
  }

  ngOnInit(): void {
    this.code = new FormControl('59334', {
      validators: [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(5)
      ]
    });
  }
}