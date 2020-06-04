import { Controller, Get, Param, Post, Body, Put, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';

import { TesourariaService } from './tesouraria.service';
import { Tesouraria } from 'src/shared/models/treasury.entity';
import { FiltroBusca } from 'src/shared/models/search-filter.entity';
import { IdInvalidException } from 'src/shared/exceptions/models/Id-invalid.exception';

@Controller('tesouraria')
@UseGuards(JwtAuthGuard)
export class TesourariaController {

    public constructor(private service: TesourariaService) { }

    @Get()
    public findPaginete(
                            @Query('filtro') filtro, 
                            @Query('page') page,
                            @Req() request: Request
                       ): Promise<any[]> 
    {
        if(!request.headers.userid){
            throw new IdInvalidException('O ID do usuário está ausente');
        }

        let userId = parseInt(request.headers.userid[0]);
        return this.service.findAll(userId, new FiltroBusca(filtro, page));
    }

    @Get(':id')
    public findById(
                        @Param('id') id: number,
                        @Req() request: Request
                   ): Promise<Tesouraria> 
    {
        if(!request.headers.userid){
            throw new IdInvalidException('O ID do usuário está ausente');
        }

        let userId = parseInt(request.headers.userid[0]);
        return this.service.findById(id, userId);
    }

    @Get('relatorio/:id')
    public getReport(
                        @Param('id') id: number, 
                        @Query('ano') ano:number,
                        @Query('mes') mes: number, 
                        @Req() request: Request
                    ): Promise<any[]> 
    {
        if(!request.headers.userid){
            throw new IdInvalidException('O ID do usuário está ausente');
        }

        let userId = parseInt(request.headers.userid[0]);
        return this.service.getReport(id, userId, ano, mes);
    }

    @Get('historico/:id')
    public getHistory(
                        @Param('id') id: number, 
                        @Query('ano') ano: number, 
                        @Req() request: Request 
                     ): Promise<any[]> 
    {
        if(!request.headers.userid){
            throw new IdInvalidException('O ID do usuário está ausente');
        }

        let userId = parseInt(request.headers.userid[0]);
        return this.service.getHistory(userId, id, ano);
    }

    @Get('receitas/:id')
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
                    @Body() tesouraria: Tesouraria,
                    @Req() request: Request
                 ) 
    {
        let userId = parseInt(request.headers.userid[0]);
        tesouraria.userId = userId;
        return this.service.save(tesouraria);
    }

    @Put()
    public update(
                    @Body() tesouraria: Tesouraria,
                    @Req() request: Request
                 ) 
    {
        if(!request.headers.userid){
            throw new IdInvalidException('O ID do usuário está ausente');
        }

        let userId = parseInt(request.headers.userid[0]);
        return this.service.update(userId, tesouraria);
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