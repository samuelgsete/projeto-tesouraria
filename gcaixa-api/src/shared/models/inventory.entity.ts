import { Entity, Column, ManyToOne } from "typeorm";
import { IsNotEmpty, IsNumber, IsDateString } from "class-validator";

import { EntidadeBase } from "./entity-base.entity";
import { Tesouraria } from "./treasury.entity";
import { inventory } from "../validation/inventory.messages";

@Entity()
export class Contagem extends EntidadeBase {

    @IsNotEmpty({message: `${inventory.actualBalanceNotNul}`})
    @IsNumber({}, {message: `${inventory.actualBalanceValid}`})
    @Column({ name:'saldo_real', type: 'float', unique: false, nullable: false })
    public saldoReal: number;

    @IsNotEmpty({message: `${inventory.dateNotNul}`})
    @IsDateString({message: `${inventory.dateValid}`})
    @Column({ type:'timestamp', nullable: false, default: new Date()})
    public registradoEm: Date;

    @ManyToOne(type => Tesouraria, tesouraria => tesouraria.contagens, { onDelete: "CASCADE" })
    public tesouraria: Tesouraria;

    public constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }
}