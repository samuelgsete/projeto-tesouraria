import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../modelos/User';

@Injectable()
export class UserService {

    private urlBase = "http://localhost:3000/user";

    public constructor(private http: HttpClient) { }

    public create(user: User): Observable<any> {
        return this.http.post<User>(this.urlBase, user);
    }
}