import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Treasury } from '../models/treasury.entity';
import { Pagination } from '../models/pagination.entity';

@Injectable()
export class TreasuryService {
    
    private urlBase: string = 'http://localhost:3000/treasury';

    constructor(private http: HttpClient) {}

    public findPaginate(paginacao: Pagination):Observable<any> {
        const _params = new HttpParams().set('page', '' + paginacao.pageCurrent).set('filter', '' + paginacao.filter);
        return this.http
            .get<any>(this.urlBase, { 
                observe: 'response', params: _params
            });
    }

    public findByIdWithFilter(id: number, type: any, year: number, month: number): Observable<any> {
        const _params = new HttpParams().set('year', `${year}`).set('month', `${month}`).set('type', `${type}`);
        return this.http.get<any>(this.urlBase.concat(`/${id}`), {
            observe: 'response', params: _params
        });
    }

    public findById(id: number): Observable<Treasury> {
        return this.http.get<Treasury>(this.urlBase.concat(`/${id}`));
    }

    public getHistoric(id: number, year: number) {
        const _params = new HttpParams().set('year', `${year}`);

        return this.http.get<any>(this.urlBase.concat(`/historic/${id}`), { observe: 'response', params: _params });
    }

    public getReport(id: number, year: number, month: number) {
        const _params = new HttpParams().set('year', `${year}`).set('month', `${month}`);

        return this.http.get<any>(this.urlBase.concat(`/report/${id}`), { observe: 'response', params: _params });
    }

    public getIncome(id: number): Observable<any> {
        return this.http.get<any>(this.urlBase.concat(`/income/${id}`));
    }

    public downloadReport(id: number, year: number, month: number) {
        const _params = new HttpParams().set('year', `${year}`).set('month', `${month}`);
        return this.http.get<any>(this.urlBase.concat(`/download/${id}`), { responseType: 'text' as 'json', observe: 'response', params: _params });
    }

    public remove(id: number): Observable<Treasury> {
        return this.http.delete<Treasury>(this.urlBase.concat(`/${id}`));
    }

    public save(treasury: Treasury): Observable<Treasury> {
        return this.http.post<Treasury>(this.urlBase, treasury);  
    }

    public update(treasury: Treasury): Observable<Treasury> {
        return this.http.put<Treasury>(this.urlBase, treasury);   
    }
}