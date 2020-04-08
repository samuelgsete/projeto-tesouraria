import { GenericService } from './generic.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Relatorio } from '../modelos/Relatorio';
import { Observable } from 'rxjs';


@Injectable()
export class RelatorioService extends GenericService<Relatorio> {
    
    public constructor(protected http: HttpClient){
        super(http, 'relatorio');
    }

    public findByDate(id: number, month: number, year: number): Observable<any> {
        const _params = new HttpParams().set('month', '' + month).set('year', '' + year)
        return this.http
                .get<any>(this.urlBase.concat(`${this.actionUrl}/${id}`), { 
                    observe: 'response', params: _params
                });
    }
}