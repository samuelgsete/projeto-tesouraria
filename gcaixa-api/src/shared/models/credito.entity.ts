import { Entity, Column, ManyToOne, UpdateDateColumn } from "typeorm";

import { Entrada } from "./entrada.entity";
import { EntidadeBase } from "./entidade-base";

@Entity()
export class Credito extends EntidadeBase {

    @Column({ length: 120, unique:false, nullable:false })
    public titular: string;

    @Column({ type: 'float', unique: false, nullable: false })
    public valor: number;

    @Column({ length: 15, unique: true, nullable: true })
    public telefone: string;

    @UpdateDateColumn()
    public registro: Date;

    @Column({ 
        type: "enum", 
        enum: ["QUITADO", "ABERTO", "ENCERRADO"], 
        default: "ABERTO", 
        unique: false, nullable: true
    })
    public situacao: TipoSituacao;

    @ManyToOne(type => Entrada, entrada => entrada.creditos, { onDelete: "CASCADE" })
    public entrada: Entrada;

    public constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }
}

export type TipoSituacao = "QUITADO" | "ABERTO" | "ENCERRADO";