import { Controller, Get, Param, Req, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { InventoryService } from './inventory.service';
import { Inventory } from 'src/shared/models/inventory.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('inventory')
export class InventoryController {

    public constructor(private readonly inventoryService: InventoryService) {}

    @Get(':treasuryId')
    public findAll(@Param('treasuryId') treasuryId: number, @Req() request: Request) {
        const userId = parseInt(request.headers['userid'].toString());
        return this.inventoryService.findAll(treasuryId, userId);
    }

    @Post(':treasuryId')
    public save(
                    @Param('treasuryId') treasuryId: number, 
                    @Req() request: Request,
                    @Body() inventory: Inventory
                ) 
    {
        const userId = parseInt(request.headers['userid'].toString());
        return this.inventoryService.create(inventory, treasuryId, userId);
    }

    @Put(':treasuryId')
    public update(
                    @Param('treasuryId') treasuryId: number, 
                    @Req() request: Request,
                    @Body() inventory: Inventory
                ) 
    {
        const userId = parseInt(request.headers['userid'].toString());
        return this.inventoryService.update(inventory, treasuryId, userId);
    }

    @Delete(':treasuryId')
    public deleteExpense(
                            @Param('treasuryId') treasuryId: number, 
                            @Req() request: Request,
                            @Body('inventoryId') inventoryId: number,
                        ) 
    {
        const userId = parseInt(request.headers['userid'].toString());
        return this.inventoryService.delete(treasuryId, userId, inventoryId);
    }
}