import { Controller, Get, Param, Req, Query, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { ReportService } from './report.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('report')
export class ReportController {

    public constructor(private readonly reportService: ReportService) {}

    @Get(':treasuryId')
    public getReport(
                        @Param('treasuryId') treasuryId: number, 
                        @Req() request: Request,
                        @Query('year') year:number,
                        @Query('month') month: number
                    ) 
    {
        const userId = parseInt(request.headers['userid'].toString());
        return this.reportService.getReport(treasuryId, userId, year, month);
    }

    @Get('download/:id')
    public downloadReportMonthly(
                                    @Param('id') id: number,
                                    @Query('year') year:number,
                                    @Query('month') month: number,
                                    @Req() request: Request
                                )
    {
        const userId = parseInt(request.headers['userid'].toString());
        return this.reportService.downloadReport(id, userId, year, month);
    }
}