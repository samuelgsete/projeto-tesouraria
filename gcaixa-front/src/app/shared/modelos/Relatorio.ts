import { Entrada } from './Entrada';
import { Saida } from './Saida';

export class Relatorio {

    public saldoMensal: number = 0;
    public rendimentoMensalEntradas: number = 0;
    public rendimentoMensalSaidas: number = 0;
    public entradas: Entrada[] = [];
    public saidas: Saida[] = []; 


    public constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}