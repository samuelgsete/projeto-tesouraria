import { Entrada } from './recipe.entity';
import { Saida } from './expense.entity';
import { Contagem } from './inventory.entity';

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