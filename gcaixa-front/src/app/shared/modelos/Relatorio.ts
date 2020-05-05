import { Entrada } from './Entrada';
import { Saida } from './Saida';

export class Relatorio {

    public nomeTesouraria: string;
    public saldoAtual: number = 0;
    public saldoInicial: number = 0;
    public saldoMensal: number = 0;
    public totalEntradas: number = 0;
    public totalSaidas: number = 0;
    public entradas: Entrada[] = [];
    public saidas: Saida[] = []

    public constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}