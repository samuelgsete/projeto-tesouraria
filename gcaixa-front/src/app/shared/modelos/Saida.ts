export class Saida {

    public id: number;
    public descricao: string;
    public valor: number;
    public registro: Date;
    public tipo: string;
    public detalhes: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}