import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthUserInterceptor implements HttpInterceptor {

  public constructor() { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("id_token");
    const userId = localStorage.getItem("user_id");

    if(idToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + idToken).set("userId", userId)
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
