import { Entity, Column, OneToMany } from "typeorm";

import { Saida } from "./saida.entity";
import { Entrada } from "./entrada.entity";
import { EntidadeBase } from "./entidade-base";
import { InsufficientFunds } from "../exceptions/modelos/insufficient-funds.exception";
import { Contagem } from "./contagem.entity";

@Entity()
export class Caixa extends EntidadeBase {
   
    @Column({ length: 120, unique: true, nullable: false })
    public nome: string;

    @Column({ type: 'float', unique: false, nullable: false })
    public saldoInicial: number;

    @Column({ type: 'float', unique: false, nullable: false })
    public saldoAtual: number;

    @OneToMany(type => Saida, saida => saida.caixa, { cascade: true })
    public saidas: Saida[];

    @OneToMany(type => Entrada, entrada => entrada.caixa, { cascade: true })
    public entradas: Entrada[];

    @OneToMany(type => Contagem, contagem => contagem.caixa, { cascade: true })
    public contagens: Contagem[];

    @Column({ length: 255, unique: false, nullable: true })
    public observacoes: string;

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
            if(this.ePossivelRetirar(s.valor)) {
                _saldo -= s.valor;
            }
            else {
                throw new InsufficientFunds('Saldo insuficiente para realizar a retirada')
            }
        });

        this.saldoAtual = this.saldoInicial + _saldo;
    }

    public ePossivelRetirar(valor: number): boolean {
        if(valor > this.saldoAtual) {
            return false;
        }
        return true;
    }
}