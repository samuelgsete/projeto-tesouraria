import { Saida } from "./saida.entity";
import { Entrada } from "./entrada.entity";
import { EntidadeBase } from "./entidade-base";
import { Contagem } from "./contagem.entity";
export declare class Caixa extends EntidadeBase {
    nome: string;
    saldoInicial: number;
    saldoAtual: number;
    saidas: Saida[];
    entradas: Entrada[];
    contagens: Contagem[];
    observacoes: string;
    constructor(values?: Object);
    atualizarSaldo(): void;
    ePossivelRetirar(valor: number): boolean;
}
