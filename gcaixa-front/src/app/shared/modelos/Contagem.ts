import { Caixa } from './Caixa';

export class Contagem {

    public id: number;
    public saldoReal: number;
    public registro: Date;

    public constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}