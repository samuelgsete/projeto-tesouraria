import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

import { RelatorioService } from './relatorio.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('relatorio')
@UseGuards(JwtAuthGuard)
export class RelatorioController {

    public constructor(private servico: RelatorioService) {}

    @Get()
    findAll(): string {
      return 'This action returns all cats';
    }

    @Get(':id')
    public findReportByDate( 
                                @Param('id') id: number,
                                @Query('month') month: number,
                                @Query('year') year: number
                            ) 
    {
        return this.servico.findReportByDate(id, month, year);
    }
}
