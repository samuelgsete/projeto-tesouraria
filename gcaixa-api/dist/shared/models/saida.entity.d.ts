import { Tesouraria } from "./tesouraria.entity";
import { EntidadeBase } from "./entidade-base";
export declare class Saida extends EntidadeBase {
    descricao: string;
    valor: number;
    registradoEm: Date;
    detalhes: string;
    readonly tipo: TipoMovimentacao;
    tesouraria: Tesouraria;
    constructor(values?: Object);
}
export declare type TipoMovimentacao = 'RECEITA' | 'DESPESA';
