import { Entity, Column, OneToMany } from "typeorm";

import { Saida } from "./saida.entity";
import { Entrada } from "./entrada.entity";
import { EntidadeBase } from "./entidade-base";
import { InsufficientFunds } from "../exceptions/modelos/insufficient-funds.exception";
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

        if(this.saldoAtual < 0) {
            throw new InsufficientFunds('Saldo insuficiente para a retirada');
        }
    }
}