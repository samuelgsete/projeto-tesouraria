import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReportService {

    private urlBase: string = 'http://localhost:3000/treasury';

    public constructor(private readonly http: HttpClient) {}

    public getReport(id: number, year: number, month: number) {
        const _params = new HttpParams().set('year', `${year}`).set('month', `${month}`);

        return this.http.get<any>(this.urlBase.concat(`/${id}/report`), { observe: 'response', params: _params });
    }

    public downloadReport(id: number, year: number, month: number) {
        const _params = new HttpParams().set('year', `${year}`).set('month', `${month}`);
        return this.http.get<any>(this.urlBase.concat(`/${id}/report/download`), { responseType: 'text' as 'json', observe: 'response', params: _params });
    }
}