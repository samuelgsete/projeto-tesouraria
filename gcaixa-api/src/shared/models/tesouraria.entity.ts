import { Entity, Column, OneToMany } from "typeorm";
import { IsNotEmpty, IsString, Length, IsInt, IsNumber, ValidateNested, IsOptional } from "class-validator";
import { Type } from 'class-transformer';

import { Saida } from "./saida.entity";
import { Entrada } from "./entrada.entity";
import { EntidadeBase } from "./entidade-base";
import { Contagem } from "./contagem.entity";
import { treasuries } from "../validation/treasuries.messages";


@Entity()
export class Tesouraria extends EntidadeBase {
   
    @IsNotEmpty({ message: `${treasuries.nameNotNull}`})
    @IsString({ message: `${treasuries.nameValid}`})
    @Length(2,30, {message: `${treasuries.nameLength}`})
    @Column({ length: 30, unique: false, nullable: false })
    public nome: string;

    @IsNotEmpty({ message: `${treasuries.openingBalanceNotNull}`})
    @IsNumber({}, { message: `${treasuries.openingBalanceValid}`})
    @Column({ type: 'float', unique: false, nullable: false })
    public saldoInicial: number;

    @IsNotEmpty({ message: `${treasuries.balanceCurrentNotNull}`})
    @IsNumber({}, { message: `${treasuries.balanceCurrentValid}`})
    @Column({ type: 'float', unique: false, nullable: false })
    public saldoAtual: number;

    @IsOptional()
    @Length(3, 255, {message: `${treasuries.detailsLength}`})
    @IsString({ message:`${treasuries.detailsValid}`})
    @Column({ length: 255, unique: false, nullable: true })
    public detalhes: string;

    @IsNotEmpty({ message: `${treasuries.userIdNotNull}`})
    @IsInt({ message: `${treasuries.userIdValid}`})
    @Column({ unique: false, nullable: false })
    public userId: number;

    @IsOptional()
    @Type(() => Saida)
    @ValidateNested()
    @OneToMany(type => Saida, saida => saida.tesouraria, { cascade: true })
    public saidas: Saida[];

    @IsOptional()
    @Type(() => Entrada)
    @ValidateNested()
    @OneToMany(type => Entrada, entrada => entrada.tesouraria, { cascade: true })
    public entradas: Entrada[];

    @IsOptional()
    @Type(() => Contagem)
    @ValidateNested()
    @OneToMany(type => Contagem, contagem => contagem.tesouraria, { cascade: true })
    public contagens: Contagem[];

    public constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }
}