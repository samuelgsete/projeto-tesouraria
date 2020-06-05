import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user.entity';
import { UserService } from 'src/app/shared/services/user.service';

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

    this.service.create(user).subscribe( response => {
      this.toastr.success(response.message, 'Tudo ok', { progressBar: true });
      this.loading = false;
      this.router.navigateByUrl('/login');
    },
    erro => {
      this.loading = false;
      this.errorMessage(erro);
    });
  }

  private errorMessage(response: any) {
    const error = response.error
    if(response.status == 0) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true });
    }

    else {
      this.toastr.error(error.details, 'ERRO', { progressBar: true });
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