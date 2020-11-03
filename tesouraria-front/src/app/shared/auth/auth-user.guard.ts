import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthUserGuard implements CanActivate {

  public constructor(private router: Router, private servico: AuthService, private toastr: ToastrService) {}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<boolean> | boolean
  {
    if(this.servico.userIsAutenticate()) {
      return true;
    }

    this.toastr.error('Você não está autenticado', 'ERRO', { progressBar: true, positionClass: 'toast-bottom-center' });
    this.router.navigateByUrl('/user/auth');
    
    return false;
  }
}
