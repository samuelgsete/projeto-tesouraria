import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";

import { Treasury } from "src/shared/models/treasury.entity";
import { Recipe } from "src/shared/models/recipe.entity";
import { Expense } from "src/shared/models/expense.entity";
import { TransactionsFilter } from "src/shared/models/transactions-filter.entity";
import { TransactionType } from "src/shared/models/enums/transaction-type.enum";
import { IdInvalidException } from "src/shared/exceptions/models/Id-invalid.exception";
import { TreasuryNotFoundException } from "src/shared/exceptions/models/treasury-not-foud.exception";
import { PermissionDeniedException } from "src/shared/exceptions/models/permission-denied.excepton";
import { RecipeType } from "src/shared/models/enums/recipe-type.enum";

const PAGE_SIZE = 6;

@Injectable()
export class TransactionsService {

    public constructor(
                            @InjectRepository(Treasury) private readonly repositoryTreasury: Repository<Treasury>,
                            @InjectRepository(Recipe) private readonly repositoryRecipe: Repository<Recipe>,
                            @InjectRepository(Expense) private readonly repositoryExpense: Repository<Expense>
                      )
    { }

    public async findPaginate(treasuryId: number, userId: number, transactionsFilter: TransactionsFilter, page: number) {
        const treasury = await this.validateUser(treasuryId, userId);
   
        const { filteredRecipes, filteredExpenses } = this.filterTransactions(transactionsFilter, treasury.recipes, treasury.expenses);
        
        const recipes = filteredRecipes;
        const expenses = filteredExpenses;

        let transactions = this.sortTransactions(recipes, expenses);
        const count = transactions.length;

        transactions = transactions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

        return {
            data: transactions,
            count: count
        }
    }

    private sortTransactions(recipes: Recipe[], expenses: Expense[]) {
        const unsorted = [...recipes, ...expenses];
        const transactions = unsorted.sort((t1, t2) => {
            if (t1.registeredIn > t2.registeredIn) { 
                return 1; 
            }
            if (t1.registeredIn < t2.registeredIn) { 
                return -1; 
            }
            return 0;
        });
        return transactions;
    }

    public async createRecipe(treasuryId: number, userId: number, recipe: Recipe) {
        const treasury = await this.validateUser(treasuryId, userId);

        treasury.recipes.push(recipe);
        treasury.currentBalance += recipe.value;
        treasury.incomeRecipes += recipe.value;

        treasury.countSale = recipe.recipeType == RecipeType.SALE ? treasury.countSale + recipe.value : treasury.countSale;
        treasury.countOffer = recipe.recipeType == RecipeType.OFFER ? treasury.countOffer + recipe.value : treasury.countOffer;
        treasury.countTaxpayer = recipe.recipeType == RecipeType.TAXPAYER ? treasury.countTaxpayer + recipe.value : treasury.countTaxpayer;
        treasury.countOther = recipe.recipeType == RecipeType.OTHER ? treasury.countOther + recipe.value : treasury.countOther;
        
        await this.repositoryTreasury.save(treasury);  
    }

    public async updateRecipe(treasuryId: number, userId: number, recipeUpdated: Recipe) {
        const treasury = await this.validateUser(treasuryId, userId);

        const currentRecipe = treasury.recipes.filter( recipe => {
            return recipe.id == recipeUpdated.id;
        })[0];
    
        const index = treasury.recipes.indexOf(currentRecipe);
        
        treasury.incomeRecipes +=  recipeUpdated.value - currentRecipe.value;
        treasury.currentBalance += recipeUpdated.value - currentRecipe.value;

        treasury.countSale = recipeUpdated.recipeType == RecipeType.SALE ? treasury.countSale + (recipeUpdated.value - currentRecipe.value) : treasury.countSale;
        treasury.countOffer = recipeUpdated.recipeType == RecipeType.OFFER ? treasury.countOffer + (recipeUpdated.value - currentRecipe.value) : treasury.countOffer;
        treasury.countTaxpayer = recipeUpdated.recipeType == RecipeType.TAXPAYER ? treasury.countTaxpayer + (recipeUpdated.value - currentRecipe.value) : treasury.countTaxpayer;
        treasury.countOther = recipeUpdated.recipeType == RecipeType.OTHER ? treasury.countOther + (recipeUpdated.value - currentRecipe.value) : treasury.countOther;

        treasury.recipes[index] = recipeUpdated;
        await this.repositoryTreasury.save(treasury);
    }

    public async deleteRecipe(treasuryId: number, userId: number, recipeId: number) {
        const treasury = await this.validateUser(treasuryId, userId);

        const currentRecipe = treasury.recipes.filter( recipe => {
            return recipe.id == recipeId;
        })[0];

        if(!currentRecipe) {
            return { message: 'Receita inexistente'}
        }

        const index = treasury.recipes.indexOf(currentRecipe);
        treasury.recipes.splice(index, 1);

        treasury.incomeRecipes -= currentRecipe.value;
        treasury.currentBalance -= currentRecipe.value;

        await this.repositoryTreasury.save(treasury);

        await this.repositoryRecipe.delete(recipeId);
    }

    public async createExpense(treasuryId: number, userId: number, expense: Expense) {
        const treasury = await this.validateUser(treasuryId, userId);
        treasury.expenses.push(expense);

        treasury.currentBalance -= expense.value;
        treasury.incomeExpenses += expense.value;

        await this.repositoryTreasury.save(treasury);
    }

    public async updateExpense(treasuryId: number, userId: number, expenseUpdated: Expense) {
        const treasury = await this.validateUser(treasuryId, userId);

        const currentExpense = treasury.expenses.filter( expense => {
            return expense.id == expenseUpdated.id;
        })[0];
    
        const index = treasury.expenses.indexOf(currentExpense);
          
        treasury.incomeExpenses += expenseUpdated.value - currentExpense.value;
        treasury.currentBalance -= expenseUpdated.value - currentExpense.value;

        treasury.expenses[index] = expenseUpdated;
        await this.repositoryTreasury.save(treasury);
    }

    public async deleteExpense(treasuryId: number, userId: number, expenseId: number) {
        const treasury = await this.validateUser(treasuryId, userId);

        const currentExpense = treasury.expenses.filter( recipe => {
            return recipe.id == expenseId;
        })[0];

        if(!currentExpense) {
            return null
        }

        const index = treasury.expenses.indexOf(currentExpense);
        treasury.expenses.splice(index, 1);

        treasury.incomeExpenses-= currentExpense.value;
        treasury.currentBalance += currentExpense.value;

        await this.repositoryTreasury.save(treasury);
        await this.repositoryExpense.delete(expenseId);
    }

    private async validateUser(treasuryId: number, userId: number) {
        if(treasuryId <= 0 || userId <=0) {
            throw new IdInvalidException("O id informado é invalído")
        }

        const treasury = await this.repositoryTreasury.findOne(treasuryId, { relations: ["expenses", "recipes"] });
        
        if(!treasury) {
            throw new TreasuryNotFoundException("Tesouraria inexistente");
        }

        if(treasury.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }
        return treasury;
    }

    private filterTransactions(transactionsFilter: TransactionsFilter, recipes: Recipe[], expenses: Expense[]) {
        let filteredRecipes = [];
        let filteredExpenses = [];
        const ALL_MONTHS = 12;

        if(transactionsFilter.type == TransactionType.RECIPE) {
            filteredRecipes = recipes.filter( recipe => {
                return recipe.registeredIn.getFullYear() == transactionsFilter.year && recipe.registeredIn.getMonth() == transactionsFilter.month;
            });

            if(transactionsFilter.month == ALL_MONTHS) {
                filteredRecipes = recipes.filter( recipe => {
                    return recipe.registeredIn.getFullYear() == transactionsFilter.year;
                });
            }
        }

        else if(transactionsFilter.type == TransactionType.EXPENSE) {
            filteredExpenses = expenses.filter( expense => {
                return expense.registeredIn.getFullYear() == transactionsFilter.year && expense.registeredIn.getMonth() == transactionsFilter.month;
            });

            if(transactionsFilter.month == ALL_MONTHS) {
                filteredExpenses = expenses.filter( expense => {
                    return expense.registeredIn.getFullYear() == transactionsFilter.year;
                });
            }
        }
       
        else {
            if(transactionsFilter.month == ALL_MONTHS) {
         
                filteredRecipes = recipes.filter( recipe => {
                    return recipe.registeredIn.getFullYear() == transactionsFilter.year;
                });
    
                filteredExpenses = expenses.filter( expense => {
                    return expense.registeredIn.getFullYear() == transactionsFilter.year;
                });
            }

            else {
                filteredRecipes = recipes.filter( recipe => {
                    return recipe.registeredIn.getFullYear() == transactionsFilter.year && recipe.registeredIn.getMonth() == transactionsFilter.month;
                });
    
                filteredExpenses = expenses.filter( expense => {
                    return expense.registeredIn.getFullYear() == transactionsFilter.year && expense.registeredIn.getMonth() == transactionsFilter.month;
                });
            }
        }
        return { filteredRecipes, filteredExpenses }
    }
}