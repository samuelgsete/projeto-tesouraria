import { Caixa } from "./caixa.entity";
import { Credito } from "./credito.entity";
import { EntidadeBase } from "./entidade-base";
export declare class Entrada extends EntidadeBase {
    descricao: string;
    valor: number;
    ofertante: string;
    registro: Date;
    tipo: TipoMovimentacao;
    creditos: Credito[];
    observacoes: string;
    caixa: Caixa;
    constructor(values?: Object);
    atualizarEntrada(): void;
}
export declare type TipoMovimentacao = "ENTRADA" | "SAIDA";
