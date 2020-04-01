import { Controller, Get, Param, Post, Body, Put, Delete, Query, UseGuards } from '@nestjs/common';

import { CaixaService } from './caixa.service';
import { Caixa } from 'src/shared/models/caixa.entity';
import { FiltroBusca } from 'src/shared/models/filtro-busca';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('caixa')
//@UseGuards(JwtAuthGuard)
export class CaixaController {

    constructor(private service: CaixaService) { }

    @Get()
    public findPaginete(@Query('filtro') filtro, @Query('page') page): Promise<Caixa[]> {
        return this.service.findAll(new FiltroBusca(filtro, page));
    }

    @Get(':id')
    public findById(@Param('id') id: number): Promise<Caixa> {
        return this.service.findById(id);
    }

    @Post()
    public create(@Body() caixa: Caixa) {
        return this.service.save(caixa);
    }

    @Put()
    public update(@Body(new ValidationPipe) caixa: Caixa) {
        return this.service.update(caixa);
    }

    @Delete(':id')
    public delete(@Param('id') id: number) {
        return this.service.delete(id);
    }
}
