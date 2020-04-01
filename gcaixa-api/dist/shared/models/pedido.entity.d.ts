import { EntidadeBase } from "./EntidadeBase";
import { Produto } from "./protudo.entity";
import { Venda } from "./venda.entity";
export declare class Pedido extends EntidadeBase {
    titular: string;
    valor: number;
    produtos: Produto[];
    venda: Venda;
    constructor(values?: Object);
}
