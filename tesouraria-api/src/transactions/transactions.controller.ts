import { Controller, Get, Param, Req, Post, Body, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { TransactionsService } from './transactions.service';
import { Recipe } from 'src/shared/models/recipe.entity';
import { Expense } from 'src/shared/models/expense.entity';
import { TransactionsFilter } from 'src/shared/models/transactions-filter.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('treasury')
export class TransactionsController {

    public constructor(private readonly transactionsService: TransactionsService) {}

    @Get(':id/transactions')
    public findPaginate(
                            @Param('id') treasuryId: number, 
                            @Req() request: Request,
                            @Query('year') year: number,
                            @Query('month') month: number,
                            @Query('type') type: string,
                            @Query('page') page: number,
                        ) 
    {
        const userId = parseInt(request.headers['userid'].toString());
        const transactonsFilter = new TransactionsFilter({ year: year, month: month, type: type });
        
        return this.transactionsService.findPaginate(treasuryId, userId, transactonsFilter, page);
    }

    @Post(':id/recipe')
    public saveRecipe(
                        @Param('id') treasuryId: number, 
                        @Req() request: Request,
                        @Body() recipe: Recipe
                     ) 
    {
        const userId = parseInt(request.headers['userid'].toString());
        return this.transactionsService.createRecipe(treasuryId, userId, recipe);
    }

    @Put(':id/recipe')
    public updateRecipe(
                        @Param('id') treasuryId: number, 
                        @Req() request: Request,
                        @Body() recipe: Recipe
                     ) 
    {
        const userId = parseInt(request.headers['userid'].toString());
        return this.transactionsService.updateRecipe(treasuryId, userId, recipe);
    }

    @Delete(':id/recipe')
    public deleteRecipe(
                            @Param('id') treasuryId: number, 
                            @Req() request: Request,
                            @Body('id') id: number,
                        ) 
    {
        const userId = parseInt(request.headers['userid'].toString());
        return this.transactionsService.deleteRecipe(treasuryId, userId, id);
    }

    @Post(':id/expense')
    public saveExpense(
                        @Param('id') treasuryId: number, 
                        @Req() request: Request,
                        @Body() expense: Expense
                     ) 
    {
        const userId = parseInt(request.headers['userid'].toString());
        return this.transactionsService.createExpense(treasuryId, userId, expense);
    }

    @Put(':id/expense')
    public updateExpense(
                        @Param('id') treasuryId: number, 
                        @Req() request: Request,
                        @Body() expense: Expense
                     ) 
    {
        const userId = parseInt(request.headers['userid'].toString());
        return this.transactionsService.updateExpense(treasuryId, userId, expense);
    }

    @Delete(':id/expense')
    public deleteExpense(
                            @Param('id') treasuryId: number, 
                            @Req() request: Request,
                            @Body('id') id: number,
                        ) 
    {
        const userId = parseInt(request.headers['userid'].toString());
        return this.transactionsService.deleteExpense(treasuryId, userId, id);
    }
}
