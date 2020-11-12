import { Column, Entity, ManyToOne } from "typeorm";
import { IsNotEmpty, Length, IsString, IsNumber, IsOptional, IsDateString, Min, Max } from "class-validator";

import { Treasury } from "./treasury.entity";
import { EntityBase } from "./entity-base.entity";
import { expenses } from "../validation/expenses.messages";
import { TransactionType } from "./enums/transaction-type.enum";

@Entity()
export class Expense extends EntityBase {

    @IsNotEmpty({ message: `${expenses.descriptionNotNul}`})
    @Length(3, 60, { message: `${expenses.descriptionLength}`})
    @IsString({ message: `${expenses.descriptionValid}`})
    @Column({ length: 60, unique: false, nullable: false })
    public description: string;

    @Min(0, { message: `${expenses.valueMin}`})
    @Max(100000, { message: `${expenses.valueMax}`})
    @IsNotEmpty({ message: `${expenses.valueNotNull}`})
    @IsNumber({}, { message: `${expenses.valueValid}`})
    @Column({ type: 'float', unique: false, nullable: false })
    public value: number;

    @IsNotEmpty({message: `${expenses.dateNotNull}`})
    @IsDateString({message: `${expenses.dateValid}`})
    @Column({ type:'timestamp', nullable: false, default: new Date()})
    public registeredIn: Date;

    @IsOptional()
    @Length(4, 255, {message: `${expenses.detailsLength}`})
    @IsString({ message:`${expenses.detailsValid}`})
    @Column({ length: 255, unique:false, nullable: true })
    public details: string;

    @Column({ 
        type: "enum", 
        enum: ['RECEITA', 'DESPESA'], 
        unique: false, nullable: false
    })
    public readonly type: TransactionType;

    @ManyToOne(type => Treasury, treasury => treasury.expenses, { onDelete: 'CASCADE' })
    public treasury: Treasury;

    constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }
}