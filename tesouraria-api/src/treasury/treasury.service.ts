import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like} from 'typeorm';

import { Treasury } from 'src/shared/models/treasury.entity';
import { SearchFilter } from 'src/shared/models/search-filter.entity';
import { IdInvalidException } from 'src/shared/exceptions/models/Id-invalid.exception';
import { PermissionDeniedException } from 'src/shared/exceptions/models/permission-denied.excepton';
import { TreasuryNotFoundException } from 'src/shared/exceptions/models/treasury-not-foud.exception';
import { IsCreatedEception } from 'src/shared/exceptions/models/is-created.exception';

@Injectable()
export class TreasuryService {

    public constructor(@InjectRepository(Treasury) private repository: Repository<Treasury>) {}

    public async findAll(userId: number, filter: SearchFilter): Promise<any> {
        const [result, total] = await this.repository.findAndCount(
            {
                where: [
                    { name: Like(filter.word), userId: userId },
                ],
                order: { name: "ASC" },
                take: 6,
                skip: filter.nextPage()
            }
        )
        return {
            data: result,
            count: total
        }
    }

    public async finByName(name: string) {
        const result = await this.repository.find({ where: { name: name }});
        const treasury = result[0];
        return treasury;
    }

    public async getResume(id: number , userId: number): Promise<any> {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        const treasury = await this.repository.findOne(id);

        if(!treasury) {
            throw new TreasuryNotFoundException("Tesouraria inexistente");
        }

        if(treasury.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }

        const income = {
            initialAmount: treasury.initialAmount,
            currentBalance: treasury.currentBalance,
            incomeRecipes: treasury.incomeRecipes,
            incomeExpenses: treasury.incomeExpenses,
            countSales: treasury.countSale,
            countOffers: treasury.countOffer,
            countContributors: treasury.countTaxpayer,
            countOthers: treasury.countOther
        }
        return income;
    }

    public async save(treasury: Treasury) {
        treasury.currentBalance = treasury.initialAmount;

        const result = await this.finByName(treasury.name);

        if(result) {
            throw new IsCreatedEception('O nome da tesouraria já está sendo utilizado', HttpStatus.BAD_REQUEST);
        }
        await this.repository.save(treasury);   
    }   

    public async update(userId: number, treasury: Treasury) { 
        if(treasury.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }

        if(treasury.id == null || treasury.id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        let outdatedTreasury = await this.repository.findOne({ where: { id: treasury.id }});
        treasury.currentBalance = treasury.currentBalance + (treasury.initialAmount - outdatedTreasury.initialAmount);

        await this.repository.save(treasury)
    }

    public async delete(id: number, userId: number) {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        let treasury = await this.repository.findOne(id);
        
        if(!treasury) {
            throw new TreasuryNotFoundException("Tesouraria inexistente");
        }

        if(treasury.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }
        await this.repository.delete(id)
    }
}