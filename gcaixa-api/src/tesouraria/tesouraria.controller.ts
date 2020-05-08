import { Controller, Get, Param, Post, Body, Put, Delete, Query, UseGuards } from '@nestjs/common';

import { TesourariaService } from './tesouraria.service';
import { Tesouraria } from 'src/shared/models/tesouraria.entity';
import { FiltroBusca } from 'src/shared/models/filtro-busca';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('tesouraria')
@UseGuards(JwtAuthGuard)
export class TesourariaController {

    constructor(private service: TesourariaService) { }

    @Get()
    public findPaginete(@Query('filtro') filtro, @Query('page') page): Promise<any[]> {
        return this.service.findAll(new FiltroBusca(filtro, page));
    }

    @Get(':id')
    public findById(@Param('id') id: number): Promise<Tesouraria> {
        return this.service.findById(id);
    }

    @Get('relatorio/:id')
    public obterRelatorioMensal(
                                    @Param('id') id: number, 
                                    @Query('ano') ano:number,
                                    @Query('mes') mes: number, 
    ): Promise<any[]> 
    {
        return this.service.obterRelatorioMensal(id, ano, mes);
    }

    @Get('historico/:id')
    public obterReceitas(@Param('id') id: number, @Query('ano') ano: number ): Promise<any[]> {
        return this.service.obterHistoricoMensal(id, ano);
    }

    @Post()
    public create(@Body() tesouraria: Tesouraria) {
        return this.service.save(tesouraria);
    }

    @Put()
    public update(@Body(new ValidationPipe) tesouraria: Tesouraria) {
        return this.service.update(tesouraria);
    }

    @Delete(':id')
    public delete(@Param('id') id: number) {
        return this.service.delete(id);
    }
}
