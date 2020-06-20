import { Controller, Param, Query, Req, Get, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { HistoricService } from './historic.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('historic')
export class HistoricController {
    public constructor(private readonly historicService: HistoricService) {}

    @Get(':treasuryId')
    public getHistoricYearly(
                                @Param('treasuryId') treasuryId: number,
                                @Query('year') year: number, 
                                @Req() request: Request 
                            ) 
    {
        const userId = parseInt(request.headers['userid'].toString());
        return this.historicService.getHistoric(treasuryId, userId, year);
    }
}
