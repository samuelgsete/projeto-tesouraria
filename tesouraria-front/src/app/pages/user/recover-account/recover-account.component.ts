import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.scss']
})
export class RecoverAccountComponent implements OnInit {

  public email: FormControl;
  public loading: boolean = false;

  public constructor(
                      private readonly router: Router, 
                      private readonly toastr: ToastrService,
                      private readonly service: UserService
                    ) { }

  public toNewUser() {
    this.router.navigateByUrl('user/create');
  }

  public verifyUser() {
    this.loading = true;
    localStorage.setItem('email', this.email.value);
    this.service.recoverAccount(this.email.value).subscribe( res => {
      localStorage.setItem('name', res.name);
      localStorage.setItem('surname', res.surname);
      localStorage.setItem('username', res.username);
      this.router.navigateByUrl('/confirm/recover');
      this.toastr.success('Verificação concluída', 'Feito', { progressBar: true, positionClass: 'toast-bottom-center' });
    }, 
    erro => {
      localStorage.removeItem('email');
      this.errorMessage(erro);
    }).add( () => {
      this.loading = false;
    });
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
    this.email = new FormControl('', {
      validators: [
        Validators.required, 
        Validators.email,
        Validators.maxLength(30)
      ]
    });
  }
}