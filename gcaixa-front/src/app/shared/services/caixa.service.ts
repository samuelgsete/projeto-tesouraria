import { GenericService } from './generic.service';
import { Caixa } from '../modelos/Caixa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CaixaService extends GenericService<Caixa> {
    
    constructor(protected http: HttpClient){
        super(http, 'caixa');
    }
}