import { Entity, Column, ManyToOne, UpdateDateColumn } from "typeorm";

import { EntidadeBase } from "./entidade-base";
import { Tesouraria } from "./tesouraria.entity";
import { IsNotEmpty, IsNumber } from "class-validator";
import { counts } from "../validation/counts.messages";

@Entity()
export class Contagem extends EntidadeBase {

    @IsNotEmpty({message: `${counts.actualBalanceNotNul}`})
    @IsNumber({}, {message: `${counts.actualBalanceValid}`})
    @Column({ name:'saldo_real', type: 'float', unique: false, nullable: false })
    public saldoReal: number;

    @IsNotEmpty({message: `${counts.dateNotNul}`})
    @Column({ type:'timestamp', nullable: false, default: new Date()})
    public registradoEm: Date;

    @ManyToOne(type => Tesouraria, tesouraria => tesouraria.contagens, { onDelete: "CASCADE" })
    public tesouraria: Tesouraria;

    public constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }
}