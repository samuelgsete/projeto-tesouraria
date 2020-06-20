import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Treasury } from "src/shared/models/treasury.entity";
import { Inventory } from "src/shared/models/inventory.entity";
import { IdInvalidException } from "src/shared/exceptions/models/Id-invalid.exception";
import { TreasuryNotFoundException } from "src/shared/exceptions/models/treasury-not-foud.exception";
import { PermissionDeniedException } from "src/shared/exceptions/models/permission-denied.excepton";

@Injectable()
export class InventoryService {

    public constructor(
                        @InjectRepository(Treasury) private readonly repositoryTreasury: Repository<Treasury>,
                        @InjectRepository(Inventory) private readonly repositoryInventory: Repository<Inventory>,
                      )
    { }

    public async findAll(treasuryId: number, userId: number) {
        const treasury = await this.validateUser(treasuryId, userId);
        return treasury.inventories;
    }

    public async create(inventory: Inventory, treasuryId: number, userId: number) {
        const treasury = await this.validateUser(treasuryId, userId);
        treasury.inventories.push(inventory);
        await this.repositoryTreasury.save(treasury); 
    }

    public async update(inventoryUpdated: Inventory, treasuryId: number, userId: number) {
        const treasury = await this.validateUser(treasuryId, userId);
        const currentInventory = treasury.inventories.filter( inventory => {
            return inventory.id == inventoryUpdated.id;
        })[0];
        const index = treasury.inventories.indexOf(currentInventory);
        treasury.inventories[index] = inventoryUpdated;
        await this.repositoryTreasury.save(treasury);
    }

    public async delete(treasuryId: number, userId: number, inventoryId: number) {
        const treasury = await this.validateUser(treasuryId, userId);
        const currentInventory = treasury.inventories.filter( inventory => {
            return inventory.id == inventoryId;
        })[0];

        const index = treasury.inventories.indexOf(currentInventory);
        treasury.inventories.splice(index, 1);

        await this.repositoryTreasury.save(treasury);
        await this.repositoryInventory.delete(inventoryId);
    }

    private async validateUser(treasuryId: number, userId: number) {
        if(treasuryId <= 0 || userId <=0) {
            throw new IdInvalidException("O id informado é invalído")
        }

        const treasury = await this.repositoryTreasury.findOne(treasuryId, { relations: ["inventories"] });
        
        if(!treasury) {
            throw new TreasuryNotFoundException("Tesouraria inexistente");
        }

        if(treasury.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }
        return treasury;
    }
}