import { Controller, Get, Param, Post, Body, Put, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';

import { TreasuryService } from './treasury.service';
import { Treasury } from 'src/shared/models/treasury.entity';
import { SearchFilter } from 'src/shared/models/search-filter.entity';
import { TransactionsFilter } from 'src/shared/models/transactions-filter.entity';
import { Recipe } from 'src/shared/models/recipe.entity';
import { Expense } from 'src/shared/models/expense.entity';

@Controller('treasury')
@UseGuards(JwtAuthGuard)
export class TreasuryController {

    public constructor  (private readonly service: TreasuryService) { }

    @Get()
    public findPaginete(
                            @Query('filter') filter, 
                            @Query('page') page,
                            @Req() request: Request
                       ): Promise<any[]> 
    {
        const userId = parseInt(request.headers['userid'].toString());
        return this.service.findAll(userId, new SearchFilter(filter, page));
    }

    @Get(':id')
    public findById(
                        @Param('id') id: number,
                        @Req() request: Request,
                        @Query('year') year: number,
                        @Query('month') month: number,
                        @Query('type') type: string,
                   ): Promise<Treasury> 
    {
        const userId = parseInt(request.headers['userid'].toString());
        const transactonsFilter = new TransactionsFilter({ year: year, month: month, type: type });

        return this.service.findById(id, userId, transactonsFilter);
    }

    @Get('report/:id')
    public getReport(
                        @Param('id') id: number, 
                        @Query('year') year:number,
                        @Query('month') month: number, 
                        @Req() request: Request
                    ): Promise<any[]> 
    {
        const userId = parseInt(request.headers['userid'].toString());
        return this.service.getReport(id, userId, year, month);
    }

    @Get('historic/:id')
    public getHistory(
                        @Param('id') id: number, 
                        @Query('year') year: number, 
                        @Req() request: Request 
                     ): Promise<any[]> 
    {
        const userId = parseInt(request.headers['userid'].toString());
        return this.service.getHistory(userId, id, year);
    }

    @Get('income/:id')
    public getRecipes(
                        @Param('id') id: number, 
                        @Req() request: Request
                     ): Promise<any> 
    {
  
        const userId = parseInt(request.headers['userid'].toString());
        return this.service.getIncome(id, userId);
    }

    @Get('download/:id')
    public downloadReportMonthly(
                                    @Param('id') id: number,
                                    @Query('year') year:number,
                                    @Query('month') month: number,
                                    @Req() request: Request
                                ): Promise<any>
    {
        const userId = parseInt(request.headers['userid'].toString());
        return this.service.downloadReport(id, userId, year, month);
    }

    @Post()
    public create(
                    @Body() treasury: Treasury,
                    @Req() request: Request
                 ) 
    {
        const userId = parseInt(request.headers['userid'].toString());
        treasury.userId = userId;
        return this.service.save(treasury);
    }

    @Put()
    public update(
                    @Body() treasury: Treasury,
                    @Req() request: Request
                 ) 
    {
        const userId = parseInt(request.headers['userid'].toString());
        return this.service.update(userId, treasury);
    }

    @Delete(':id')
    public delete(
                    @Param('id') id: number, 
                    @Req() request: Request
                 )
    {
        const userId = parseInt(request.headers['userid'].toString());
        return this.service.delete(id, userId);
    }
}