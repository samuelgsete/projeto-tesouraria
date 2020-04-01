import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paginacao } from '../modelos/paginacao';

export abstract class GenericService<T> {

    protected urlBase: string = 'http://localhost:3000/';
    
    public constructor(protected http: HttpClient, protected actionUrl: string) { }

    public save(object: T): Observable<T> {
        return this.http.post<T>(this.urlBase.concat(this.actionUrl), object );  
    }

    public update(object: T): Observable<T> {
        return this.http.put<T>(this.urlBase.concat(this.actionUrl), object )   
    }

    public findAll():Observable<T[]> {
        return this.http.get<T[]>(this.urlBase.concat(this.actionUrl));
    }

    public findPaginate(paginacao: Paginacao):Observable<any> {
        const _params = new HttpParams().set('page', '' + paginacao.page).set('filtro', '' + paginacao.filter)
        return this.http
            .get<any>(this.urlBase.concat(this.actionUrl), { 
                observe: 'response', params: _params
            });
    }

    public findById(id: string): Observable<T> {
        return this.http.get<T>(this.urlBase.concat(this.actionUrl).concat('/'+id));
    }

    public remove(id: string): Observable<T> {
        return this.http.delete<T>(this.urlBase.concat(this.actionUrl).concat('/'+id));
    }
}