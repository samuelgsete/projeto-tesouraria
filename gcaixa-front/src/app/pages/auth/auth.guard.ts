import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Injectable(
)
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private servico: UsuarioService, private toastr: ToastrService) { 
  }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<boolean> | boolean
  {
    if(this.servico.userIsAutenticate()) {
      return true;
    }

    this.toastr.info('Você não está autenticado', 'ERRO', { progressBar: true });
    this.router.navigateByUrl('/login');
    
    return false;
  }
}
