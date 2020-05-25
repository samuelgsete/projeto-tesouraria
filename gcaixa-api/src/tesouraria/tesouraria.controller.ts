import { Controller, Get, Param, Post, Body, Put, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';

import { TesourariaService } from './tesouraria.service';
import { Tesouraria } from 'src/shared/models/tesouraria.entity';
import { FiltroBusca } from 'src/shared/models/filtro-busca';
import { JsonToObjectPipe } from 'src/shared/pipes/json-to-object.pipe';

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
        let userId = parseInt(request.headers.userid[0]);
        return this.service.findAll(userId, new FiltroBusca(filtro, page));
    }

    @Get(':id')
    public findById(
                        @Param('id') id: number,
                        @Req() request: Request
                   ): Promise<Tesouraria> 
    {
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
        let userId = parseInt(request.headers.userid[0]);
        return this.service.getHistory(userId, id, ano);
    }

    @Get('receitas/:id')
    public getRecipes(
                        @Param('id') id: number, 
                        @Req() request: Request
                     ): Promise<any> 
    {
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
        return this.service.save(userId, tesouraria);
    }

    @Put()
    public update(
                    @Body(new JsonToObjectPipe) tesouraria: Tesouraria,
                    @Req() request: Request
                 ) 
    {
        let userId = parseInt(request.headers.userid[0]);
        return this.service.update(userId, tesouraria);
    }

    @Delete(':id')
    public delete(
                    @Param('id') id: number, 
                    @Req() request: Request
                 )
    {
        let userId = parseInt(request.headers.userid[0]);
        return this.service.delete(id, userId);
    }
}