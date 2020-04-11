import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Caixa } from '../modelos/Caixa';
import { Paginacao } from '../modelos/paginacao';

@Injectable()
export class CaixaService {
    
    private urlBase: string = 'http://localhost:3000/caixa';

    constructor(private http: HttpClient){ }

    public findPaginate(paginacao: Paginacao):Observable<any> {
        const _params = new HttpParams().set('page', '' + paginacao.page).set('filtro', '' + paginacao.filter)
        return this.http
            .get<any>(this.urlBase, { 
                observe: 'response', params: _params
            });
    }

    public findById(id: string): Observable<Caixa> {
        return this.http.get<Caixa>(this.urlBase.concat('/' + id));
    }

    public remove(id: string): Observable<Caixa> {
        return this.http.delete<Caixa>(this.urlBase.concat('/'+id));
    }

    public save(caixa: Caixa): Observable<Caixa> {
        return this.http.post<Caixa>(this.urlBase, caixa);  
    }

    public update(caixa: Caixa): Observable<Caixa> {
        return this.http.put<Caixa>(this.urlBase, caixa );   
    }

    public findAll() :Observable<Caixa[]> {
        return this.http.get<Caixa[]>(this.urlBase);
    }
}