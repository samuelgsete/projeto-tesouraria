import { Entrada } from "./entrada.entity";
import { EntidadeBase } from "./entidade-base";
export declare class Credito extends EntidadeBase {
    titular: string;
    valor: number;
    telefone: string;
    registro: Date;
    situacao: TipoSituacao;
    entrada: Entrada;
    constructor(values?: Object);
}
export declare type TipoSituacao = "QUITADO" | "ABERTO" | "ENCERRADO";
