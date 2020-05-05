import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Tesouraria } from '../modelos/Tesouraria';
import { Paginacao } from '../modelos/paginacao';

@Injectable()
export class TesourariaService {
    
    private urlBase: string = 'http://localhost:3000/tesouraria';

    constructor(private http: HttpClient){ }

    public findPaginate(paginacao: Paginacao):Observable<any> {
        const _params = new HttpParams().set('page', '' + paginacao.page).set('filtro', '' + paginacao.filter)
        return this.http
            .get<any>(this.urlBase, { 
                observe: 'response', params: _params
            });
    }

    public findById(id: string): Observable<Tesouraria> {
        return this.http.get<Tesouraria>(this.urlBase.concat('/' + id));
    }

    public remove(id: string): Observable<Tesouraria> {
        return this.http.delete<Tesouraria>(this.urlBase.concat('/'+id));
    }

    public save(tesouraria: Tesouraria): Observable<Tesouraria> {
        return this.http.post<Tesouraria>(this.urlBase, tesouraria);  
    }

    public update(tesouraria: Tesouraria): Observable<Tesouraria> {
        return this.http.put<Tesouraria>(this.urlBase, tesouraria);   
    }

    public findAll() :Observable<Tesouraria[]> {
        return this.http.get<Tesouraria[]>(this.urlBase);
    }
}