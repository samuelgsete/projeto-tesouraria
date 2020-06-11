import { Entity, Column, OneToMany } from "typeorm";
import { IsNotEmpty, IsString, Length, IsInt, IsNumber, ValidateNested, IsOptional } from "class-validator";
import { Type } from 'class-transformer';

import { Expense } from "./expense.entity";
import { Recipe } from "./recipe.entity";
import { EntityBase } from "./entity-base.entity";
import { Inventory } from "./inventory.entity";
import { treasuries } from "../validation/treasuries.messages";


@Entity()
export class Treasury extends EntityBase {
   
    @IsNotEmpty({ message: `${treasuries.nameNotNull}`})
    @IsString({ message: `${treasuries.nameValid}`})
    @Length(2,30, {message: `${treasuries.nameLength}`})
    @Column({ length: 30, unique: false, nullable: false })
    public name: string;

    @IsNotEmpty({ message: `${treasuries.initialAmountNotNull}`})
    @IsNumber({}, { message: `${treasuries.initialAmountValid}`})
    @Column({ type: 'float', unique: false, nullable: false })
    public initialAmount: number;

    @IsNotEmpty({ message: `${treasuries.balanceCurrentNotNull}`})
    @IsNumber({}, { message: `${treasuries.balanceCurrentValid}`})
    @Column({ type: 'float', unique: false, nullable: false })
    public currentBalance: number;

    @IsOptional()
    @Length(3, 255, {message: `${treasuries.detailsLength}`})
    @IsString({ message:`${treasuries.detailsValid}`})
    @Column({ length: 255, unique: false, nullable: true })
    public details: string;

    @IsNotEmpty({ message: `${treasuries.userIdNotNull}`})
    @IsInt({ message: `${treasuries.userIdValid}`})
    @Column({ unique: false, nullable: false })
    public userId: number;

    @IsOptional()
    @Type(() => Expense)
    @ValidateNested()
    @OneToMany(type => Expense, expense => expense.treasury, { cascade: true })
    public expenses: Expense[];

    @IsOptional()
    @Type(() => Recipe)
    @ValidateNested()
    @OneToMany(type => Recipe, recipe => recipe.treasury, { cascade: true })
    public recipes: Recipe[];

    @IsOptional()
    @Type(() => Inventory)
    @ValidateNested()
    @OneToMany(type => Inventory, inventory => inventory.treasury, { cascade: true })
    public inventories: Inventory[];

    public constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }
}