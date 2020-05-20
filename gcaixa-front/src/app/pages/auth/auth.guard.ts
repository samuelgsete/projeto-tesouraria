import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable(
)
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private servico: AuthService, private toastr: ToastrService) { 
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
