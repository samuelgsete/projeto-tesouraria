import { Entity, Column, ManyToOne, UpdateDateColumn } from "typeorm";
import { IsNotEmpty, Length, IsString, IsNumber } from "class-validator";

import { Recipe } from "./recipe.entity";
import { EntityBase } from "./entity-base.entity";
import { credits } from "../validation/credits.messages";
import { StatusType } from "./enums/status-type.enum";

@Entity()
export class Credit extends EntityBase {

    @IsNotEmpty({ message: `${credits.holderNotNul}` })
    @Length(2, 60, { message: `${credits.holderLength}` })
    @IsString({ message: `${credits.holderValid}` })
    @Column({ length: 60, unique:false, nullable:false })
    public holder: string;

    @IsNotEmpty({ message: `${credits.valueNotNull}` })
    @IsNumber({}, { message: `${credits.valueValid}` })
    @Column({ type: 'float', unique: false, nullable: false })
    public value: number;

    @IsNotEmpty({ message: `${credits.phoneNotNul}` })
    @Length(10, 15, { message: `${credits.phoneLength}` })
    @IsString({ message: `${credits.phoneValid}` })
    @Column({ length: 15, unique: false, nullable: true })
    public telephone: string;

    @UpdateDateColumn()
    public registeredIn: Date;

    @Column({ 
        type: "enum", 
        enum: ["QUITADO", "ABERTO", "ENCERRADO"], 
        default: "ABERTO", 
        unique: false, nullable: true
    })
    public status: StatusType;

    @ManyToOne(type => Recipe, recipe => recipe.credits, { onDelete: "CASCADE" })
    public recipe: Recipe;

    public constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }
}