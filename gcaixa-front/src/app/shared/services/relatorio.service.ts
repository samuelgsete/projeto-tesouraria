import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';


@Injectable()
export class RelatorioService {

    private urlBase: string = 'http://localhost:3000/relatorio';
    
    public constructor(private http: HttpClient){ }

    public findByDate(id: number, month: number, year: number): Observable<any> {
        const _params = new HttpParams().set('month', '' + month).set('year', '' + year)
        return this.http
                .get<any>(this.urlBase.concat(`/${id}`), { 
                    observe: 'response', params: _params
                });
    }
}