import { Component, OnInit  } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  public code: FormControl = new FormControl('', {
    validators: [
      Validators.required, 
      Validators.minLength(5), 
      Validators.maxLength(5)
    ]
  });

  public email = '';
  public name = '';
  public loading = false;

  public constructor(
                      private readonly toastr: ToastrService,
                      private readonly router: Router, 
                      private readonly userService: UserService
  ) {
    this.email = localStorage.getItem('userEmail');
    this.name = localStorage.getItem('name');

    if(this.email === null || this.name === null) {
      this.router.navigateByUrl('/user/create');
    }
  }

  public finalizeRegistration(){
    this.loading = true;

    this.userService.verifyUser(this.code.value).subscribe( res => {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('name');
      this.loading = false;
      this.toastr.success('Criado com sucesso', 'Bem vindo', { progressBar: true });
      this.router.navigateByUrl('/login');
    },
    err => {
      this.loading = false;
      this.errorMessage(err);
    })
  }

  public createUser() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('name');
    this.router.navigateByUrl('/user/create');
  }

  public resendCode() {
    const email = localStorage.getItem('userEmail');

    this.userService.resendCode(email).subscribe( res => {
      this.toastr.info('Código reenviado', 'Tudo ok', { progressBar: true });
    },
    err => {
      this.errorMessage(err);
    });
  }

  private errorMessage(response: any) {
    const error = response.error;
    if(response.status == 0) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true });
    }

    else if(response.status == 404) {
      this.toastr.error(error.message, 'ERRO', { progressBar: true });
    }

    else {
      this.toastr.error(error.details, 'ERRO', { progressBar: true });
    }
  }

  ngOnInit(): void { }
}
