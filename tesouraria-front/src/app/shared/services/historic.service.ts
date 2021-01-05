import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HistoricService {

    private urlBase: string = 'http://localhost:3000/treasury';

    public constructor(private readonly http: HttpClient) {}

    public getHistoric(id: number, year: number) {
        const _params = new HttpParams().set('year', `${year}`);

        return this.http.get<any>(this.urlBase.concat(`/${id}/historic`), { observe: 'response', params: _params });
    }
}