import { Entity, ManyToOne, Column, OneToMany, CreateDateColumn } from "typeorm";

import { Tesouraria } from "./tesouraria.entity";
import { Credito } from "./credito.entity";
import { EntidadeBase } from "./entidade-base";
import { IsNotEmpty, Length, IsString, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { recipes } from "../validation/recipes.messages";
import { Type } from "class-transformer";

@Entity()
export class Entrada extends EntidadeBase {

    @IsNotEmpty({ message: `${recipes.descriptionNotNul}` })
    @Length(3, 60, { message: `${recipes.descriptionLength}` })
    @IsString({message: `${recipes.descriptionValid}` })
    @Column({ length: 60, unique: false, nullable: false })
    public descricao: string;

    @IsNotEmpty({ message: `${recipes.valueNotNull}`})
    @IsNumber({}, { message: `${recipes.valueValid}`})
    @Column({ type: 'float', unique: false, nullable: false })
    public valor: number;

    @IsOptional()
    @IsString({ message: `${recipes.offererValid}` })
    @Length(3, 60, { message: `${recipes.offererLength}` })
    @Column({ length: 60, unique: false, nullable: true })
    public ofertante: string;

    @Column({ 
        type: 'enum', 
        enum: ['RECEITA', 'DESPESA'], 
        unique: false, nullable: false
    })
    public readonly tipo: TipoMovimentacao;

    @ValidateNested()
    @Type(() => Credito)
    @OneToMany(type => Credito, credito => credito.entrada, { cascade: true })
    public creditos: Credito[];
    
    @IsOptional()
    @Length(3, 255, {message: `${recipes.detailsLength}`})
    @IsString({ message:`${recipes.detailsValid}`})
    @Column({ length: 255, unique: false, nullable: true })
    public detalhes: string;

    @IsNotEmpty({message: `${recipes.dateNotNull}`})
    @Column({ type:'timestamp', nullable: false, default: new Date()})
    public registradoEm: Date;

    @ManyToOne(type => Tesouraria, tesouraria => tesouraria.entradas, { onDelete: "CASCADE" })
    public tesouraria: Tesouraria;

    public constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }
}

export type TipoMovimentacao = 'RECEITA' | 'DESPESA';
