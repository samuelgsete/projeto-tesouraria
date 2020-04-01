import { Credito } from "./credito.entity";
import { Pedido } from "./pedido.entity";
import { EntidadeBase } from "./EntidadeBase";
export declare class Venda extends EntidadeBase {
    descricao: string;
    faturamento: number;
    pedidos: Pedido[];
    creditos: Credito[];
    constructor(values?: Object);
}
