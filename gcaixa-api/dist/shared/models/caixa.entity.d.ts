import { Saida } from "./saida.entity";
import { Entrada } from "./entrada.entity";
import { EntidadeBase } from "./entidade-base";
export declare class Caixa extends EntidadeBase {
    nome: string;
    saldoInicial: number;
    saldoAtual: number;
    saidas: Saida[];
    entradas: Entrada[];
    observacoes: string;
    constructor(values?: Object);
    atualizarSaldo(): void;
    ePossivelRetirar(valor: number): boolean;
}
