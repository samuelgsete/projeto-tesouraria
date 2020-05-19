import { Entity, ManyToOne, Column, OneToMany, CreateDateColumn } from "typeorm";

import { Tesouraria } from "./tesouraria.entity";
import { Credito } from "./credito.entity";
import { EntidadeBase } from "./entidade-base";

@Entity()
export class Entrada extends EntidadeBase {

    @Column({ length: 120, unique: false, nullable: false })
    public descricao: string;

    @Column({ type: 'float', unique: false, nullable: false })
    public valor: number;

    @Column({ length: 120, unique: false, nullable: true })
    public ofertante: string;

    @CreateDateColumn()
    public registro: Date;

    @Column({ 
        type: "enum", 
        enum: ["ENTRADA", "SAIDA"], 
        unique: false, nullable: false
    })
    public tipo: TipoMovimentacao = "ENTRADA";

    @OneToMany(type => Credito, credito => credito.entrada, { cascade: true })
    public creditos: Credito[];
    
    @Column({ length: 255, unique: false, nullable: true })
    public detalhes: string;

    @ManyToOne(type => Tesouraria, tesouraria => tesouraria.entradas, { onDelete: "CASCADE" })
    public tesouraria: Tesouraria;

    public constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }

    public atualizarEntrada() {
        let _valor = 0; 
        this.creditos.forEach( c => {
            if(c.situacao === 'QUITADO'){
                _valor += c.valor;
                c.situacao = 'ENCERRADO';
            }
        });
        this.valor += _valor;
    }
}

export type TipoMovimentacao = "ENTRADA" | "SAIDA";
