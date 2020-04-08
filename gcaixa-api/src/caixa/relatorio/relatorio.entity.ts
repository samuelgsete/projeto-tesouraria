import { Entrada } from "src/shared/models/entrada.entity";
import { Saida } from "src/shared/models/saida.entity";

export class Relatorio {

    public nomeCaixa: string;
    public saldoInicial = 0;
    public saldoAtual = 0;
    public saldoMensal = 0;
    public totalEntradas = 0;
    public totalSaidas = 0;
    public entradas: Entrada[];
    public saidas: Saida[];

    public constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    public calcularSaldoDoMes() {
        this.entradas.forEach(e => {
            this.totalEntradas += e.valor;
        });

        this.saidas.forEach(s=> {
            this.totalSaidas += s.valor;
        });

        this.saldoMensal = this.totalEntradas - this.totalSaidas;
    }
}