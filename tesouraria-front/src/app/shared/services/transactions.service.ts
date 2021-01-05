import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Recipe } from '../models/recipe.entity';
import { Expense } from '../models/expense.entity';

@Injectable()
export class TransactionsService {
    private urlBase: string = 'http://localhost:3000/treasury';

    public constructor(private readonly http: HttpClient) {}

    public findPaginate(id: number, type: any, year: number, month: number, page: number) {
        const _params = new HttpParams().set('year', `${year}`).set('month', `${month}`).set('type', `${type}`).set('page',`${page}`);
        return this.http.get<any>(this.urlBase.concat(`/${id}/transactions`), {
            observe: 'response', params: _params
        });
    }

    public createRecipe(id: number, recipe: Recipe) {
        return this.http.post<Recipe>(this.urlBase.concat(`/${id}/recipe`), recipe);
    }

    public updateRecipe(id: number, recipe: Recipe) {
        return this.http.put<Recipe>(this.urlBase.concat(`/${id}/recipe`), recipe);
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
        return this.http.delete<any>(this.urlBase.concat(`/${treasuryId}/recipe`), options);
    }

    public createExpense(id: number, expense: Expense) {
        return this.http.post<Expense>(this.urlBase.concat(`/${id}/expense`), expense);
    }

    public updateExpense(id: number, expense: Expense) {
        return this.http.put<Expense>(this.urlBase.concat(`/${id}/expense`), expense);
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
        return this.http.delete<any>(this.urlBase.concat(`/${treasuryId}/expense`), options);
    }
}