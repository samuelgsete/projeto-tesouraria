import { Column, Entity, ManyToOne, CreateDateColumn } from "typeorm";

import { Tesouraria } from "./tesouraria.entity";
import { EntidadeBase } from "./entidade-base";

@Entity()
export class Saida extends EntidadeBase {

    @Column({ length: 120, unique: false, nullable: false })
    public descricao: string;

    @Column({ type: 'float', unique: false, nullable: false })
    public valor: number;

    @CreateDateColumn()
    public registro: Date;

    @Column({ length: 255, unique:false, nullable: true })
    public detalhes: string;

    @Column({ 
        type: "enum", 
        enum: ["ENTRADA", "SAIDA"], 
        unique: false, nullable: false
    })
    public tipo: TipoMovimentacao = "SAIDA";

    @ManyToOne(type => Tesouraria, tesouraria => tesouraria.saidas, { onDelete: 'CASCADE' })
    public tesouraria: Tesouraria;

    constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }
}

export type TipoMovimentacao = "ENTRADA" | "SAIDA";