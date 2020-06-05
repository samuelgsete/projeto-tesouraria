import { Entity, ManyToOne, Column, OneToMany } from "typeorm";
import { IsNotEmpty, Length, IsString, IsNumber, IsOptional, ValidateNested, IsDateString } from "class-validator";
import { Type } from "class-transformer";

import { Treasury } from "./treasury.entity";
import { Credit } from "./credit.entity";
import { EntityBase } from "./entity-base.entity";
import { recipes } from "../validation/recipes.messages";
import { TransactionType } from "./enums/transaction-type.enum";

@Entity()
export class Recipe extends EntityBase {

    @IsNotEmpty({ message: `${recipes.descriptionNotNul}` })
    @Length(3, 60, { message: `${recipes.descriptionLength}` })
    @IsString({message: `${recipes.descriptionValid}` })
    @Column({ length: 60, unique: false, nullable: false })
    public description: string;

    @IsNotEmpty({ message: `${recipes.valueNotNull}`})
    @IsNumber({}, { message: `${recipes.valueValid}`})
    @Column({ type: 'float', unique: false, nullable: false })
    public value: number;

    @IsOptional()
    @IsString({ message: `${recipes.offererValid}` })
    @Length(3, 60, { message: `${recipes.offererLength}` })
    @Column({ length: 60, unique: false, nullable: true })
    public offerer: string;

    @Column({ 
        type: 'enum', 
        enum: ['RECEITA', 'DESPESA'], 
        unique: false, nullable: false
    })
    public readonly type: TransactionType;

    @ValidateNested()
    @Type(() => Credit)
    @OneToMany(type => Credit, credit => credit.recipe, { cascade: true })
    public credits: Credit[];

    @IsNotEmpty({message: `${recipes.dateNotNull}`})
    @IsDateString({message: `${recipes.dateValid}`})
    @Column({ type:'timestamp', nullable: false, default: new Date()})
    public registeredIn: Date;
    
    @IsOptional()
    @Length(3, 255, {message: `${recipes.detailsLength}`})
    @IsString({ message:`${recipes.detailsValid}`})
    @Column({ length: 255, unique: false, nullable: true })
    public details: string;

    @ManyToOne(type => Treasury, treasury => treasury.recipes, { onDelete: "CASCADE" })
    public treasury: Treasury;

    public constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }
}