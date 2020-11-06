import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Recipe } from '../models/recipe.entity';
import { Expense } from '../models/expense.entity';

@Injectable()
export class TransactionsService {
    private urlBase: string = 'https://tesouraria-core.herokuapp.com/transactions';

    public constructor(private readonly http: HttpClient) {}

    public findAll(treasuryId: number, type: any, year: number, month: number) {
        const _params = new HttpParams().set('year', `${year}`).set('month', `${month}`).set('type', `${type}`);
        return this.http.get<any>(this.urlBase.concat(`/${treasuryId}`), {
            observe: 'response', params: _params
        });
    }

    public createRecipe(treasuryId: number, recipe: Recipe) {
        return this.http.post<Recipe>(this.urlBase.concat(`/recipe/${treasuryId}`), recipe);
    }

    public updateRecipe(treasuryId: number, recipe: Recipe) {
        return this.http.put<Recipe>(this.urlBase.concat(`/recipe/${treasuryId}`), recipe);
    }

    public deleteRecipe(treasuryId: number, recipeId: number) {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            body: {
              id: recipeId
            }
        }
        return this.http.delete<any>(this.urlBase.concat(`/recipe/${treasuryId}`), options);
    }

    public createExpense(treasuryId: number, expense: Expense) {
        return this.http.post<Expense>(this.urlBase.concat(`/expense/${treasuryId}`), expense);
    }

    public updateExpense(treasuryId: number, expense: Expense) {
        return this.http.put<Expense>(this.urlBase.concat(`/expense/${treasuryId}`), expense);
    }

    public deleteExpense(treasuryId: number, expenseId: number) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: {
              id: expenseId
            }
        }
        return this.http.delete<any>(this.urlBase.concat(`/expense/${treasuryId}`), options);
    }
}