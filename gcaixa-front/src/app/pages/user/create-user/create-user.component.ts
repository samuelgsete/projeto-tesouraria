import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/modelos/User';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public form: FormGroup;

  public constructor(
                        private readonly router: Router, 
                        private readonly _fb: FormBuilder, 
                        private readonly toastr: ToastrService,
                        private readonly service: UserService
                    ) 
  { }

  public createUser(data: any) {
    let user = new User({
      name: data.name,
      surname: data.surname,
      email: data.email,
      username: data.username,
      password: data.password
    });

    this.service.create(user).subscribe( response => {
      this.toastr.success('Criado com sucesso', 'Tudo ok', { progressBar: true });
      this.router.navigateByUrl('/login');
    },
    erro => {
      this.errorMessage(erro);
    });
  }

  private errorMessage(response: any) {
    if(response.status == 0) {
      this.toastr.error('Servidor inacéssivel', 'ERRO', { progressBar: true });
    }

    if(response.status == 500) {
      this.toastr.error(response.error.detalhes, 'ERRO', { progressBar: true });
    }
  }

  ngOnInit() {
    this.form = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      surname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      password: ['', Validators.required]
    });
  }
}