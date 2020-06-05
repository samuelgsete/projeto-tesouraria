import { Controller, Get, Param, Post, Body, Put, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';

import { TreasuryService } from './treasury.service';
import { Treasury } from 'src/shared/models/treasury.entity';
import { SearchFilter } from 'src/shared/models/search-filter.entity';
import { IdInvalidException } from 'src/shared/exceptions/models/Id-invalid.exception';

@Controller('treasury')
@UseGuards(JwtAuthGuard)
export class TreasuryController {

    public constructor(private service: TreasuryService) { }

    @Get()
    public findPaginete(
                            @Query('filter') filter, 
                            @Query('page') page,
                            @Req() request: Request
                       ): Promise<any[]> 
    {
        if(!request.headers.userid){
            throw new IdInvalidException('O ID do usuário está ausente');
        }

        let userId = parseInt(request.headers.userid[0]);
        return this.service.findAll(userId, new SearchFilter(filter, page));
    }

    @Get(':id')
    public findById(
                        @Param('id') id: number,
                        @Req() request: Request
                   ): Promise<Treasury> 
    {
        if(!request.headers.userid){
            throw new IdInvalidException('O ID do usuário está ausente');
        }

        let userId = parseInt(request.headers.userid[0]);
        return this.service.findById(id, userId);
    }

    @Get('report/:id')
    public getReport(
                        @Param('id') id: number, 
                        @Query('year') year:number,
                        @Query('month') month: number, 
                        @Req() request: Request
                    ): Promise<any[]> 
    {
        if(!request.headers.userid){
            throw new IdInvalidException('O ID do usuário está ausente');
        }

        let userId = parseInt(request.headers.userid[0]);
        return this.service.getReport(id, userId, year, month);
    }

    @Get('historic/:id')
    public getHistory(
                        @Param('id') id: number, 
                        @Query('year') year: number, 
                        @Req() request: Request 
                     ): Promise<any[]> 
    {
        if(!request.headers.userid){
            throw new IdInvalidException('O ID do usuário está ausente');
        }

        let userId = parseInt(request.headers.userid[0]);
        return this.service.getHistory(userId, id, year);
    }

    @Get('income/:id')
    public getRecipes(
                        @Param('id') id: number, 
                        @Req() request: Request
                     ): Promise<any> 
    {
        if(!request.headers.userid){
            throw new IdInvalidException('O ID do usuário está ausente');
        }

        let userId = parseInt(request.headers.userid[0]);
        return this.service.getRecipes(id, userId);
    }

    @Post()
    public create(
                    @Body() treasury: Treasury,
                    @Req() request: Request
                 ) 
    {
        let userId = parseInt(request.headers.userid[0]);
        treasury.userId = userId;
        return this.service.save(treasury);
    }

    @Put()
    public update(
                    @Body() treasury: Treasury,
                    @Req() request: Request
                 ) 
    {
        if(!request.headers.userid){
            throw new IdInvalidException('O ID do usuário está ausente');
        }

        let userId = parseInt(request.headers.userid[0]);
        return this.service.update(userId, treasury);
    }

    @Delete(':id')
    public delete(
                    @Param('id') id: number, 
                    @Req() request: Request
                 )
    {
        if(!request.headers.userid){
            throw new IdInvalidException('O ID do usuário está ausente');
        }

        let userId = parseInt(request.headers.userid[0]);
        return this.service.delete(id, userId);
    }
}