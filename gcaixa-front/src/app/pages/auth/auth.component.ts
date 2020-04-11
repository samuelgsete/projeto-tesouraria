import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Usuario } from 'src/app/shared/modelos/Usuario';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
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
        private servico: UsuarioService, 
        private toastr: ToastrService
  ) {
   }
  
  public fazerLogin(usuario: Usuario) {
    this.servico.login(usuario).subscribe( res => {
      localStorage.setItem("id_token", res.access_token);
      this.router.navigateByUrl('/home');
    }, err => {
      this.toastr.info('Login ou senha inválidos', 'ERRO', { progressBar: true });
      this.f.reset();
    });
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
