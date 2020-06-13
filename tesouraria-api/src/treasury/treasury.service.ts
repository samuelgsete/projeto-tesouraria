import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like} from 'typeorm';

import * as ejs from 'ejs';

import { Treasury } from 'src/shared/models/treasury.entity';
import { SearchFilter } from 'src/shared/models/search-filter.entity';
import { IdInvalidException } from 'src/shared/exceptions/models/Id-invalid.exception';
import { PermissionDeniedException } from 'src/shared/exceptions/models/permission-denied.excepton';
import { TreasuryNotFoundException } from 'src/shared/exceptions/models/treasury-not-foud.exception';
import { IsCreatedEception } from 'src/shared/exceptions/models/is-created.exception';
import { TransactionsService } from './transactions.service';
import { TransactionsFilter } from 'src/shared/models/transactions-filter.entity';

@Injectable()
export class TreasuryService {

    public constructor(
                        @InjectRepository(Treasury) private repository: Repository<Treasury>,
                        private readonly transactionService: TransactionsService
    ) {}

    public async findAll(userId: number, filter: SearchFilter): Promise<any> {
        const [result, total] = await this.repository.findAndCount(
            {
                relations: ["expenses", "recipes", "inventories", "recipes.credits"],
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

    public async findById(id: number, userId: number, transactionsFilter: TransactionsFilter): Promise<Treasury> {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        let treasury = await this.repository.findOne(id, { relations: ["expenses", "recipes", "inventories", "recipes.credits"] });
        
        if(treasury == null) {
            throw new TreasuryNotFoundException("Tesouraria inexistente");
        }

        if(treasury.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }

        const { filteredRecipes, filteredExpenses } = this.transactionService.filterTransactions(transactionsFilter, treasury.recipes, treasury.expenses);
        
        treasury.recipes = filteredRecipes;
        treasury.expenses = filteredExpenses;

        return treasury;
    }

    public async finByName(name: string) {
        const result = await this.repository.find({ where: { name: name }});
        const treasury = result[0];
        return treasury;
    }

    public async getReport(id: number, userId: number, ano: number, mes: number): Promise<any> {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        const treasury = await this.repository.findOne(id, { relations: ["expenses", "recipes", "inventories", "recipes.credits"] });

        if(treasury == null) {
            throw new TreasuryNotFoundException("Tesouraria inexistente");
        }

        if(treasury.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }

        const report = this.transactionService.getReportMonthly(ano, mes, treasury.recipes, treasury.expenses);
    
        return report;
    }

    public async getHistory(userId: number, id: number, year:number): Promise<any> {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        const treasury = await this.repository.findOne(id, { relations: ["expenses", "recipes", "inventories", "recipes.credits"] });
        
        if(treasury == null) {
            throw new TreasuryNotFoundException("Tesouraria inexistente");
        }

        if(treasury.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }

        const incomeYearly = this.transactionService.getIncomeYearly(year, treasury.recipes, treasury.expenses);
        const historyYearly = this.transactionService.getHistoryYearly(year, treasury.initialAmount, treasury.recipes, treasury.expenses);
       
        return { incomeYearly, historyYearly }
    }

    public async getRecipes(id: number , userId: number): Promise<any> {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        let treasury = await this.repository.findOne(id, { relations: ["expenses", "recipes", "inventories", "recipes.credits"] });

        if(treasury == null) {
            throw new TreasuryNotFoundException("Tesouraria inexistente");
        }

        if(treasury.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }

        let recipes = this.transactionService.getRecipeGeneral(treasury.recipes, treasury.expenses, treasury.initialAmount, treasury.currentBalance);

        return recipes;
    }

    public async save(treasury: Treasury) {
        treasury.currentBalance = treasury.initialAmount;

        const result = await this.finByName(treasury.name);

        if(result) {
            throw new IsCreatedEception('O nome da tesouraria já está sendo utilizado', HttpStatus.BAD_REQUEST);
        }

        return this.repository
            .save(treasury)
            .then( e => {
                return {
                    mensagem: 'Criado com sucesso'
                };
            });     
    }   

    public async update(userId: number, treasury: Treasury) { 

        if(treasury.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }

        if(treasury.id == null || treasury.id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        treasury.currentBalance = this.transactionService.updateBalance(treasury.recipes, treasury.expenses, treasury.initialAmount);

        return this.repository
            .save(treasury)
            .then( e => {
                return {
                    mensagem: 'Atualizado com sucesso'
                };
            }); 
    }

    public async delete(id: number, userId: number) {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        let treasury = await this.repository.findOne(id, { relations: ["expenses", "recipes", "inventories", "recipes.credits"] });
        
        if(treasury  == null) {
            throw new TreasuryNotFoundException("Tesouraria inexistente");
        }

        if(treasury.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }

        return this.repository
            .delete(id)
            .then( e => { 
                return {
                    mensagem: 'Deletado com sucesso'
                };
            });
    }

    public async downloadReport(id: number, userId: number, year: number, month) {
        const  options =  { format: 'A4', orientation: 'landscape' };
        const income = await this.getRecipes(id, userId);
        const report = await this.getReport(id, userId, year, month);
        let document = '';

        const months = [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril', 
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outrubo', 
            'Novembro',
            'Dezembro'
        ];

        const monthSelected = months[month];

        ejs.renderFile("src/treasury/template-report.ejs", { income: income, report: report, year: year, month: monthSelected }, (err, html) => {
            if(err) {
                throw new Error('Não foi possivel renderizar o documento');
            }
            else {
                document = html;  
            }
        }); 
        return document;  
    }
}