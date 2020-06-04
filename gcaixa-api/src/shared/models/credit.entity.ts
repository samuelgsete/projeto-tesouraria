import { Entity, Column, ManyToOne, UpdateDateColumn } from "typeorm";
import { IsNotEmpty, Length, IsString, IsNumber } from "class-validator";

import { Entrada } from "./recipe.entity";
import { EntidadeBase } from "./entity-base.entity";
import { credits } from "../validation/credits.messages";

@Entity()
export class Credito extends EntidadeBase {

    @IsNotEmpty({ message: `${credits.holderNotNul}` })
    @Length(2, 60, { message: `${credits.holderLength}` })
    @IsString({ message: `${credits.holderValid}` })
    @Column({ length: 60, unique:false, nullable:false })
    public titular: string;

    @IsNotEmpty({ message: `${credits.valueNotNull}` })
    @IsNumber({}, { message: `${credits.valueValid}` })
    @Column({ type: 'float', unique: false, nullable: false })
    public valor: number;

    @IsNotEmpty({ message: `${credits.phoneNotNul}` })
    @Length(10, 15, { message: `${credits.phoneLength}` })
    @IsString({ message: `${credits.phoneValid}` })
    @Column({ length: 15, unique: false, nullable: true })
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