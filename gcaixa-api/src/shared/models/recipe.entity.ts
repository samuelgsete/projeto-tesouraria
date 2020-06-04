import { Entity, ManyToOne, Column, OneToMany } from "typeorm";
import { IsNotEmpty, Length, IsString, IsNumber, IsOptional, ValidateNested, IsDateString } from "class-validator";
import { Type } from "class-transformer";

import { Tesouraria } from "./treasury.entity";
import { Credito } from "./credit.entity";
import { EntidadeBase } from "./entity-base.entity";
import { recipes } from "../validation/recipes.messages";

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

    @IsNotEmpty({message: `${recipes.dateNotNull}`})
    @IsDateString({message: `${recipes.dateValid}`})
    @Column({ type:'timestamp', nullable: false, default: new Date()})
    public registradoEm: Date;
    
    @IsOptional()
    @Length(3, 255, {message: `${recipes.detailsLength}`})
    @IsString({ message:`${recipes.detailsValid}`})
    @Column({ length: 255, unique: false, nullable: true })
    public detalhes: string;

    @ManyToOne(type => Tesouraria, tesouraria => tesouraria.entradas, { onDelete: "CASCADE" })
    public tesouraria: Tesouraria;

    public constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }
}

export type TipoMovimentacao = 'RECEITA' | 'DESPESA';
