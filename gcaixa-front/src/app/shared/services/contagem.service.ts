import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Paginacao } from '../modelos/paginacao';
import { Contagem } from '../modelos/Contagem';

@Injectable()
export class ContagemService {
  
  private urlBase: string = 'http://localhost:3000/contagem';

  public constructor(private http: HttpClient){ }

  public findPaginate(paginacao: Paginacao):Observable<any> {
    const _params = new HttpParams().set('page', '' + paginacao.page)
    return this.http
        .get<any>(this.urlBase, { 
            observe: 'response', params: _params
        });
  }

  public findAllByIdCaixa(id: string): Observable<Contagem> {
      return this.http.get<Contagem>(this.urlBase.concat(`/caixa/${id}`));
  }

  public remove(id: string): Observable<Contagem> {
      return this.http.delete<Contagem>(this.urlBase.concat(`/${id}`));
  }

  public save(contagem: Contagem): Observable<Contagem> {
      return this.http.post<Contagem>(this.urlBase, contagem);  
  }

  public update(caixa: Contagem): Observable<Contagem> {
      return this.http.put<Contagem>(this.urlBase, caixa );   
  }
}
