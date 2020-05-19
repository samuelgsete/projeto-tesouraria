import { Entity, Column, OneToMany } from "typeorm";

import { Saida } from "./saida.entity";
import { Entrada } from "./entrada.entity";
import { EntidadeBase } from "./entidade-base";
import { Contagem } from "./contagem.entity";

@Entity()
export class Tesouraria extends EntidadeBase {
   
    @Column({ length: 120, unique: true, nullable: false })
    public nome: string;

    @Column({ type: 'float', unique: false, nullable: false })
    public saldoInicial: number;

    @Column({ type: 'float', unique: false, nullable: false })
    public saldoAtual: number;

    @OneToMany(type => Saida, saida => saida.tesouraria, { cascade: true })
    public saidas: Saida[];

    @OneToMany(type => Entrada, entrada => entrada.tesouraria, { cascade: true })
    public entradas: Entrada[];

    @OneToMany(type => Contagem, contagem => contagem.tesouraria, { cascade: true })
    public contagens: Contagem[];

    @Column({ length: 255, unique: false, nullable: true })
    public detalhes: string;

    public constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }

    public atualizarSaldo() { 
        let _saldo = 0;
        this.entradas.forEach( e => {
            e.atualizarEntrada();
            _saldo += e.valor;
        });

        this.saidas.forEach( s => {
            _saldo -= s.valor;
        });

        this.saldoAtual = this.saldoInicial + _saldo;
    }

    private obterMovimentacoesPorMes(ano: number, mes: number) {

        let entradas = this.entradas.filter( entrada => {
            return entrada.registro.getFullYear() == ano && entrada.registro.getMonth() == mes;
        });

        let saidas= this.saidas.filter( saida => {
            return saida.registro.getFullYear() == ano && saida.registro.getMonth() == mes;
        });

        return { entradas, saidas }
    }

    private obterRendimento(entradas: Entrada[], saidas: Saida[]){

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

    public obterHistoricoMensalDeReceitas(ano: number) {
        let rendimentosMensais = [];
        let receitasMensais = [];

        for(let mes = 1; mes <= 12; mes++) {

            let { entradas, saidas } = this.obterMovimentacoesPorMes(ano, mes);
            let { rendimentoEntradas, rendimentoSaidas } = this.obterRendimento(entradas, saidas);

            rendimentosMensais.push({
                rendimentoEntradas, 
                rendimentoSaidas 
            });

            let { saldoMensal, saldoReal } = this.obterHistoricoMensalDoSaldo(ano, mes);
            receitasMensais.push({
                saldoMensal,
                saldoReal
            });
        }

        return { 
            rendimentosMensais,
            receitasMensais
        }
    }

    private obterHistoricoMensalDoSaldo(ano: number, mes: number) {
        let entradas = this.entradas.filter( entrada => {
            return entrada.registro.getFullYear() == ano && entrada.registro.getMonth() <= mes;
        });

        let saidas = this.saidas.filter( saida => {
            return saida.registro.getFullYear() == ano && saida.registro.getMonth() <= mes;
        });

        let contagens = this.contagens.filter( contagem => {
            return contagem.registro.getFullYear() == ano && contagem.registro.getMonth() == mes;
        });

        let { rendimentoEntradas, rendimentoSaidas } = this.obterRendimento(entradas, saidas);

        let saldoReal = 0;

        let saldoMensal = this.saldoInicial + (rendimentoEntradas - rendimentoSaidas);
        saldoMensal = saldoMensal.toFixed(1) === this.saldoAtual.toFixed(1) ? 0: saldoMensal;
        
        if(contagens.length != 0) {
            saldoReal = contagens[0].saldoReal
        }
        
        return { saldoMensal, saldoReal }
    }

    public obterRelatorioDeReceitas(ano: number, mes: number) {

        let { entradas, saidas } = this.obterMovimentacoesPorMes(ano, mes);

        let rendimentoMensal = this.obterRendimento(entradas, saidas);

        let rendimentoMensalEntradas = rendimentoMensal.rendimentoEntradas;
        let rendimentoMensalSaidas = rendimentoMensal.rendimentoSaidas;

        let saldoMensal = rendimentoMensalEntradas - rendimentoMensalSaidas;

        return {
            entradas, 
            saidas,
            rendimentoMensalEntradas,
            rendimentoMensalSaidas,
            saldoMensal 
        }
    }

    public obeterReceitas() {
        let saldoInicial = this.saldoInicial;
        let saldoAtual = this.saldoAtual;

        let { rendimentoEntradas, rendimentoSaidas } = this.obterRendimento(this.entradas, this.saidas);
       
        return {
            saldoInicial,
            saldoAtual,
            rendimentoEntradas,
            rendimentoSaidas 
        }
    }
}