import { Controller, Get, Param, Post, Body, Put, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';

import { TreasuryService } from './treasury.service';
import { Treasury } from 'src/shared/models/treasury.entity';
import { SearchFilter } from 'src/shared/models/search-filter.entity';

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

    @Get('resume/:id')
    public getRecipes(
                        @Param('id') id: number, 
                        @Req() request: Request
                     ): Promise<any> 
    {
        const userId = parseInt(request.headers['userid'].toString());
        return this.service.getResume(id, userId);
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