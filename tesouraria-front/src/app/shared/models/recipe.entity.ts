import { RecipeType } from './enums/recipe-type.enum';
import { TransactionType } from './enums/transaction-type.enum';

export class Recipe {

    public id: number;
    public description: string;
    public value: number;
    public offerer: string;
    public registeredIn: Date;
    public type: TransactionType;
    public recipeType: RecipeType;
    public details: string;

    public constructor(values: Object = {}) { Object.assign(this, values) }
}