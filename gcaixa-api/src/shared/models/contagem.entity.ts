import { Entity, Column, CreateDateColumn, ManyToOne } from "typeorm";

import { EntidadeBase } from "./entidade-base";
import { Caixa } from "./caixa.entity";

@Entity()
export class Contagem extends EntidadeBase {

    @Column({ name:'saldo_real', type: 'float', unique: false, nullable: false })
    public saldoReal: number;

    @CreateDateColumn()
    public registro: Date;

    @ManyToOne(type => Caixa, caixa => caixa.contagens, { onDelete: "CASCADE" })
    public caixa: Caixa;

    public constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }
}