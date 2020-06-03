import { Entrada } from './Entrada';
import { Saida } from './Saida';
import { Contagem } from './Contagem';

export class Tesouraria {

    public id:string;
    public nome: string;
    public saldoInicial: number;
    public saldoAtual: number;
    public entradas: Array<Entrada> = [];
    public saidas: Array<Saida> = [];
    public contagens: Array<Contagem> = [];
    public detalhes: string;
    public userId: number;

    public constructor(values: Object = {}) { Object.assign(this, values) }
}