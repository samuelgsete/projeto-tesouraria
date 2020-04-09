import { Entrada } from "./entrada.entity";
import { EntidadeBase } from "./entidade-base";
export declare class Credito extends EntidadeBase {
    titular: string;
    valor: number;
    abertura: Date;
    encerramento: Date;
    situacao: TipoSituacao;
    entrada: Entrada;
    constructor(values?: Object);
}
export declare type TipoSituacao = "QUITADO" | "ABERTO" | "ENCERRADO";
