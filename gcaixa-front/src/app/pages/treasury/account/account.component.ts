import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.entity';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public form: FormGroup;
  public user = new User();
  public indicadorDeCarregamento = true;
  @ViewChild('modal') modal: any;

  public constructor(
                      private readonly userService: UserService,
                      private readonly _fb: FormBuilder, 
                      private readonly toastr: ToastrService,
                      private readonly router: Router
                    ) { }

  public load() {
    this.indicadorDeCarregamento = true;
    const userId = parseInt(localStorage.getItem("user_id"));
    this.userService.findById(userId).subscribe( response => {
      this.user = response;
      this.indicadorDeCarregamento = false;
    })
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

    this.userService.update(user).subscribe( response => {
      this.toastr.success(response.message, 'Feito', { progressBar: true });
      this.modal.hide();
      this.load();
    },
    error => {
      this.errorMessage(error);
    });
  }

  errorMessage(err: any) {
    if(err.status == 0) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true });
    }

    else if(err.status == 401) {
      this.router.navigateByUrl('/login');
      this.toastr.info('Necessário autenticação', 'ERRO', { progressBar: true });
      localStorage.removeItem('id_token');
      localStorage.removeItem('user_id');
    }
    else {
      this.toastr.error(err.error.details, 'ERRO', { progressBar: true });
    }
  }

  ngOnInit(): void {
    this.load();

    this.form = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      whatzapp: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      password: ['', Validators.required]
    });
  }
}
