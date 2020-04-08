import { Controller, Get, Param, Query } from '@nestjs/common';
import { RelatorioService } from './relatorio.service';

@Controller('relatorio')
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
