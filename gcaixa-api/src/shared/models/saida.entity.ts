import { Column, Entity, ManyToOne, CreateDateColumn } from "typeorm";
import { IsNotEmpty, Length, IsString, IsNumber, IsOptional } from "class-validator";

import { Tesouraria } from "./tesouraria.entity";
import { EntidadeBase } from "./entidade-base";
import { expenses } from "../validation/expenses.messages";

@Entity()
export class Saida extends EntidadeBase {

    @IsNotEmpty({ message: `${expenses.descriptionNotNul}`})
    @Length(3, 60, { message: `${expenses.descriptionLength}`})
    @IsString({ message: `${expenses.descriptionValid}`})
    @Column({ length: 60, unique: false, nullable: false })
    public descricao: string;

    @IsNotEmpty({ message: `${expenses.valueNotNull}`})
    @IsNumber({}, { message: `${expenses.valueValid}`})
    @Column({ type: 'float', unique: false, nullable: false })
    public valor: number;

    @CreateDateColumn()
    public registro: Date;

    @IsOptional()
    @Length(3, 255, {message: `${expenses.detailsLength}`})
    @IsString({ message:`${expenses.detailsValid}`})
    @Column({ length: 255, unique:false, nullable: true })
    public detalhes: string;

    @Column({ 
        type: "enum", 
        enum: ["ENTRADA", "SAIDA"], 
        unique: false, nullable: false
    })
    public readonly tipo: TipoMovimentacao = "SAIDA";

    @ManyToOne(type => Tesouraria, tesouraria => tesouraria.saidas, { onDelete: 'CASCADE' })
    public tesouraria: Tesouraria;

    constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }
}

export type TipoMovimentacao = "ENTRADA" | "SAIDA";