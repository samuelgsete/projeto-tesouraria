import { Entrada } from './Entrada';
import { Saida } from './Saida';
import { Contagem } from './Contagem';

export class Caixa {

    public id:string;
    public nome: string;
    public saldoInicial: number;
    public saldoAtual: number;
    public entradas: Array<Entrada> = [];
    public saidas: Array<Saida> = [];
    public contagens: Array<Contagem> = [];
    public observacoes: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}