import { Entrada } from './Entrada';
import { Saida } from './Saida';
import { Contagem } from './Contagem';

export class Tesouraria {

    public id:string;
    public nome: string;
    public saldoInicial: number;
    public saldoAtual: number;
    public entradas: Array<Entrada> = [];
    public saidas: Array<Saida> = [];
    public contagens: Array<Contagem> = [];
    public detalhes: string;

    public constructor(values: Object = {}) { Object.assign(this, values) }

    public obterMovimentacoesPorPeriodo(ano: number, mes: number) {

        let entradas = this.entradas.filter( entrada => {
            return this.obterAnoDeUmaData(entrada.registro) == ano && this.obterMesDeUmaData(entrada.registro) == mes;
        });

        let saidas= this.saidas.filter( saida => {
            return this.obterAnoDeUmaData(saida.registro) == ano && this.obterMesDeUmaData(saida.registro) == mes;
        });

        return { entradas, saidas }
    }

    private obterAnoDeUmaData(data: any) {

        let ano = data.split('-')[0];

        return parseInt(ano);
    }

    private obterMesDeUmaData(data: any) {
        let mes = data.split('-')[1];

        return parseInt(mes);
    }

    public obterRendimentoPorMovimentacoes(entradas: Entrada[], saidas: Saida[]){

        let rendimentoEntradas = 0

        entradas.forEach( entrada => {
            rendimentoEntradas += entrada.valor;
        });

        let rendimentoSaidas = 0;

        saidas.forEach( saida => {
            rendimentoSaidas += saida.valor;
        });

        return { rendimentoEntradas, rendimentoSaidas }
    }

    public gerarRelatorioPorPeriodo(ano: number, mes: number) {

        const { entradas, saidas } = this.obterMovimentacoesPorPeriodo(ano, mes);

        let rendimento = this.obterRendimentoPorMovimentacoes(entradas, saidas);

        let rendimentoMensalEntradas = rendimento.rendimentoEntradas;

        let rendimentoMensalSaidas = rendimento.rendimentoSaidas;

        const { rendimentoEntradas, rendimentoSaidas } = this.obterRendimentoPorMovimentacoes(this.entradas, this.saidas);

        let saldoMensal = rendimentoMensalEntradas - rendimentoMensalSaidas;

        return {
            entradas,
            saidas, 
            rendimentoMensalEntradas,
            rendimentoMensalSaidas,
            saldoMensal,
            rendimentoEntradas,
            rendimentoSaidas
        }
    }

    public obterSaldoAteUmPeriodo(ano: number, mes: number) {
        let entradas = this.entradas.filter( entrada => {
            return this.obterAnoDeUmaData(entrada.registro) == ano && this.obterMesDeUmaData(entrada.registro) <= mes;
        });

        let saidas = this.saidas.filter( saida => {
            return this.obterAnoDeUmaData(saida.registro) == ano && this.obterMesDeUmaData(saida.registro) <= mes;
        });

        let { rendimentoEntradas, rendimentoSaidas } = this.obterRendimentoPorMovimentacoes(entradas, saidas);

        if(rendimentoEntradas == 0 && rendimentoSaidas == 0) {
            return 0;
        }

        let saldo = this.saldoInicial + (rendimentoEntradas - rendimentoSaidas);

        return saldo;
    }

    public obterSaldoRealPorPeriodo(ano: number, mes: number) {
        let contagem = this.contagens.filter( contagem => {
            return this.obterAnoDeUmaData(contagem.registro) == ano && this.obterMesDeUmaData(contagem.registro) == mes;
        })[0];

        if(contagem == null) {
            return 0;
        }

        return contagem.saldoReal;
    }
}