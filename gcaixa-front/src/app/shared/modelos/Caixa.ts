import { Entrada } from './Entrada';
import { Saida } from './Saida';

export class Caixa {

    public id:string;
    public nome: string;
    public saldoInicial: number;
    public saldoAtual: number;
    public entradas: Array<Entrada> = [];
    public saidas: Array<Saida> = []
    public observacoes: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}