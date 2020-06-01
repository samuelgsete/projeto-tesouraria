import { Tesouraria } from "./tesouraria.entity";
import { Credito } from "./credito.entity";
import { EntidadeBase } from "./entidade-base";
export declare class Entrada extends EntidadeBase {
    descricao: string;
    valor: number;
    ofertante: string;
    readonly tipo: TipoMovimentacao;
    creditos: Credito[];
    detalhes: string;
    registradoEm: Date;
    tesouraria: Tesouraria;
    constructor(values?: Object);
}
export declare type TipoMovimentacao = 'RECEITA' | 'DESPESA';
