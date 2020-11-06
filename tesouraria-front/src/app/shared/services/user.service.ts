import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.entity';

@Injectable()
export class UserService {

    private urlBase = 'https://tesouraria-core.herokuapp.com/user';

    public constructor(private http: HttpClient) { }

    public findById(id: number): Observable<User> {
        return this.http.get<User>(this.urlBase.concat(`/${id}`));
    }

    public create(user: User): Observable<any> {
        return this.http.post(this.urlBase, user);
    }

    public finalizeRegistration(code: string): Observable<any> {
        return this.http.post(this.urlBase.concat(`/${code}`), '');
    }

    public resendCode(email: string): Observable<any> {
        return this.http.put(this.urlBase.concat(`/resend`), { email });
    }

    public update(user: User): Observable<any> {
        return this.http.put(this.urlBase, user);
    }
}