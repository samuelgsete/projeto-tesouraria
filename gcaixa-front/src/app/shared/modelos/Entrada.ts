import { Credito } from './Credito';

export class Entrada {

    public id: number;
    public descricao: string;
    public valor: number;
    public ofertante: string;
    public registro: Date;
    public creditos: Credito[] = [];
    public tipo: string;
    public observacoes: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}