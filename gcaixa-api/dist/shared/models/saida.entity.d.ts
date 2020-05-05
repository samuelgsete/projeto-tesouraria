import { Tesouraria } from "./tesouraria.entity";
import { EntidadeBase } from "./entidade-base";
export declare class Saida extends EntidadeBase {
    descricao: string;
    valor: number;
    registro: Date;
    detalhes: string;
    tipo: TipoMovimentacao;
    tesouraria: Tesouraria;
    constructor(values?: Object);
}
export declare type TipoMovimentacao = "ENTRADA" | "SAIDA";
