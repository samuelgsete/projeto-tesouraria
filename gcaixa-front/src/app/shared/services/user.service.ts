import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../modelos/User';

@Injectable()
export class UserService {

    private urlBase = "http://localhost:3000/user";

    public constructor(private http: HttpClient) { }

    public findById(id: number): Observable<User> {
        return this.http.get<User>(this.urlBase.concat(`/${id}`));
    }

    public create(user: User): Observable<any> {
        return this.http.post(this.urlBase, user);
    }

    public update(user: User): Observable<any> {
        return this.http.put(this.urlBase, user);
    }
}