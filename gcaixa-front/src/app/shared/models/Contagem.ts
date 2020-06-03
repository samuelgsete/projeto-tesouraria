export class Contagem {

    public id: number;
    public saldoReal: number;
    public registradoEm: Date;

    public constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}