import { Caixa } from "./caixa.entity";
import { EntidadeBase } from "./entidade-base";
export declare class Saida extends EntidadeBase {
    descricao: string;
    valor: number;
    registro: Date;
    motivo: string;
    tipo: TipoMovimentacao;
    caixa: Caixa;
    constructor(values?: Object);
}
export declare type TipoMovimentacao = "ENTRADA" | "SAIDA";
