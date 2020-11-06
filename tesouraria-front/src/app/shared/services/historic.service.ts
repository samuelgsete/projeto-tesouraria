import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HistoricService {

    private urlBase: string = 'https://tesouraria-core.herokuapp.com/historic';

    public constructor(private readonly http: HttpClient) {}

    public getHistoric(treasuryId: number, year: number) {
        const _params = new HttpParams().set('year', `${year}`);

        return this.http.get<any>(this.urlBase.concat(`/${treasuryId}`), { observe: 'response', params: _params });
    }
}