import { EntidadeBase } from "./EntidadeBase";
export declare abstract class Movimentacao extends EntidadeBase {
    descricao: string;
    registro: Date;
    valor: number;
    tipo: TipoMovimentacao;
}
export declare type TipoMovimentacao = "ENTRADA" | "SAIDA";
