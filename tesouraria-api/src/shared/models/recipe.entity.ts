import { Entity, ManyToOne, Column } from "typeorm";
import { IsNotEmpty, Length, IsString, IsNumber, IsOptional, IsDateString, Min, Max } from "class-validator";

import { Treasury } from "./treasury.entity";
import { EntityBase } from "./entity-base.entity";
import { recipes } from "../validation/recipes.messages";
import { TransactionType } from "./enums/transaction-type.enum";
import { RecipeType } from "./enums/recipe-type.enum";

@Entity()
export class Recipe extends EntityBase {

    @IsNotEmpty({ message: `${recipes.descriptionNotNul}` })
    @Length(3, 60, { message: `${recipes.descriptionLength}` })
    @IsString({message: `${recipes.descriptionValid}` })
    @Column({ length: 60, unique: false, nullable: false })
    public description: string;

    @Min(0, { message: `${recipes.valueMin}`})
    @Max(100000, { message: `${recipes.valueMax}`})
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

    @Column({ 
        type: 'enum', 
        enum: ['Venda', 'Oferta do culto', 'Contribuinte', 'Outros'], 
        unique: false, nullable: true
    })
    public recipeType: RecipeType;

    @IsNotEmpty({message: `${recipes.dateNotNull}`})
    @IsDateString({message: `${recipes.dateValid}`})
    @Column({ type:'timestamp', nullable: false, default: new Date()})
    public registeredIn: Date;
    
    @IsOptional()
    @Length(4, 255, {message: `${recipes.detailsLength}`})
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