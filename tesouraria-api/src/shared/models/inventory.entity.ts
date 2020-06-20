import { Entity, Column, ManyToOne } from "typeorm";
import { IsNotEmpty, IsNumber, IsDateString } from "class-validator";

import { EntityBase } from "./entity-base.entity";
import { Treasury } from "./treasury.entity";
import { inventory } from "../validation/inventory.messages";

@Entity()
export class Inventory extends EntityBase {

    @IsNotEmpty({message: `${inventory.actualBalanceNotNul}`})
    @IsNumber({}, {message: `${inventory.actualBalanceValid}`})
    @Column({ type: 'float', unique: false, nullable: false })
    public actualBalance: number;

    @IsNotEmpty({message: `${inventory.currentBalanceNotNul}`})
    @IsNumber({}, {message: `${inventory.currentBalanceValid}`})
    @Column({ type: 'float', unique: false, nullable: true })
    public currentBalance: number;

    @Column({ type: 'float', unique: false, nullable: true })
    public discrepancy: number;

    @IsNotEmpty({message: `${inventory.dateNotNul}`})
    @IsDateString({message: `${inventory.dateValid}`})
    @Column({ type:'timestamp', nullable: false, default: new Date()})
    public registeredIn: Date;

    @ManyToOne(type => Treasury, treasury => treasury.inventories, { onDelete: "CASCADE" })
    public treasury: Treasury;

    public constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }
}