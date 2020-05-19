export class Receitas {

    public saldoInicial: number = 0;
    public saldoAtual: number = 0;
    public rendimentoEntradas: number = 0;
    public rendimentoSaidas: number = 0;

    public constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}