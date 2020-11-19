import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.entity';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PasswordValidator } from 'src/app/shared/validators/password.validator';
import { NoWhiteSpaceValidator } from 'src/app/shared/validators/no.white.space.validator';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public form: FormGroup;
  public user = new User();
  public loading = true;
  @ViewChild('modal') modal: any;

  public constructor(
                      private readonly userService: UserService,
                      private readonly _fb: FormBuilder, 
                      private readonly toastr: ToastrService,
                      private readonly router: Router
                    ) { }

  public load() {
    this.loading= true;
    const userId = parseInt(localStorage.getItem("user_id"));
    this.userService.findById(userId).subscribe( response => {
      this.user = response;
    }, error => {
      this.errorMessage(error);
    }).add( () => {
      this.loading = false;
    });
  }

  public abrirModal() {
    this.modal.show();

    this.form.patchValue({
      name: this.user.name,
      surname: this.user.surname,
      email: this.user.email,
      whatzapp: this.user.whatzapp,
      username: this.user.username,
      password: this.user.password,
    });
  }

  public atualizar(usuario: User) {
    const user = new User({
      id: parseInt(localStorage.getItem("user_id")),
      name: usuario.name,
      surname: usuario.surname,
      email: usuario.email,
      whatzapp: usuario.whatzapp,
      username: usuario.username,
      password: usuario.password
    });
    this.loading = true;
    this.userService.update(user).subscribe( response => {
      this.toastr.success(response.message, 'Feito', { progressBar: true });
      this.modal.hide();
      this.load();
    },
    error => {
      this.errorMessage(error);
    }).add( () => {
      this.loading = false;
    });
  }

  public errorMessage(err: any) {
    if(err.status == 0) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true });
    }

    else if(err.status == 401) {
      this.router.navigateByUrl('user/auth');
      this.toastr.error('Necessário autenticação', 'Sessão expirada', { progressBar: true, positionClass: 'toast-bottom-center' });
      localStorage.removeItem('id_token');
      localStorage.removeItem('user_id');
    }
    else {
      this.toastr.error(err.error.details, 'ERRO', { progressBar: true });
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

  ngOnInit(): void {
    this.load();
    this.form = this._fb.group({
      name: [this.user.name, [Validators.required, Validators.minLength(4), Validators.maxLength(30), new NoWhiteSpaceValidator()]],
      surname: [this.user.surname, [Validators.required, Validators.minLength(4), Validators.maxLength(30), new NoWhiteSpaceValidator()]],
      email: [this.user.email, [Validators.required, Validators.email, Validators.maxLength(30), new NoWhiteSpaceValidator()]],
      whatzapp: [this.user.whatzapp, [Validators.required, Validators.minLength(11), Validators.maxLength(15), new NoWhiteSpaceValidator()]],
      username: [this.user.username, [Validators.required, Validators.minLength(4), Validators.maxLength(30), new NoWhiteSpaceValidator()]],
      password: [this.user.password, [Validators.required, Validators.minLength(4), Validators.maxLength(30), new NoWhiteSpaceValidator()]],
      confirmPassword: [this.user.password, [Validators.required, Validators.minLength(4), Validators.maxLength(30), new NoWhiteSpaceValidator()]]
    }, {
      validators: new PasswordValidator().confirmed('password', 'confirmPassword')
    });
  }
}