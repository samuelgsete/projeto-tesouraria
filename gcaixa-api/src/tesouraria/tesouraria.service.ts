import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like} from 'typeorm';

import { Tesouraria } from 'src/shared/models/treasury.entity';
import { FiltroBusca } from 'src/shared/models/search-filter.entity';
import { IdInvalidException } from 'src/shared/exceptions/models/Id-invalid.exception';
import { PermissionDeniedException } from 'src/shared/exceptions/models/permission-denied.excepton';
import { TreasuryNotFoundException } from 'src/shared/exceptions/models/treasury-not-foud.exception';
import { IsCreatedEception } from 'src/shared/exceptions/models/is-created.exception';
import { TransactionsService } from './transactions.service';

@Injectable()
export class TesourariaService {

    public constructor(
                        @InjectRepository(Tesouraria) private repositoryTesouraria: Repository<Tesouraria>,
                        private readonly transactionService: TransactionsService
    ) {}

    public async findAll(userId: number, filtro: FiltroBusca): Promise<any> {
        const [result, total] = await this.repositoryTesouraria.findAndCount(
            {
                relations: ["saidas", "entradas", "contagens", "entradas.creditos"],
                where: [
                    { nome: Like(filtro.palavra), userId: userId },
                ],
                order: { nome: "ASC" },
                take: 6,
                skip: filtro.nextPage()
            }
        )
        return {
            data: result,
            count: total
        }
    }

    public async findById(id: number, userId: number): Promise<Tesouraria> {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        let tesouraria = await this.repositoryTesouraria.findOne(id, { relations: ["saidas", "entradas", "contagens", "entradas.creditos"] });
        
        if(tesouraria == null) {
            throw new TreasuryNotFoundException("Tesouraria inexistente");
        }

        if(tesouraria.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }

        return tesouraria;
    }

    public async finByName(name: string) {
        const result = await this.repositoryTesouraria.find({ where: { nome: name }});
        const treasury = result[0];
        return treasury;
    }

    public async getReport(id: number, userId: number, ano: number, mes: number): Promise<any> {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        const tesouraria = await this.repositoryTesouraria.findOne(id, { relations: ["saidas", "entradas", "contagens", "entradas.creditos"] });

        if(tesouraria == null) {
            throw new TreasuryNotFoundException("Tesouraria inexistente");
        }

        if(tesouraria.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }

        const report = this.transactionService.getReportMonthly(ano, mes, tesouraria.entradas, tesouraria.saidas);
    
        return report;
    }

    public async getHistory(userId: number, id: number, ano:number): Promise<any> {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        const tesouraria = await this.repositoryTesouraria.findOne(id, { relations: ["saidas", "entradas", "contagens", "entradas.creditos"] });
        
        if(tesouraria == null) {
            throw new TreasuryNotFoundException("Tesouraria inexistente");
        }

        if(tesouraria.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }

        const incomeYearly = this.transactionService.getIncomeYearly(ano, tesouraria.entradas, tesouraria.saidas);
        const historyYearly = this.transactionService.getHistoryYearly(ano, tesouraria.saldoInicial, tesouraria.entradas, tesouraria.saidas);
       
        return { incomeYearly, historyYearly }
    }

    public async getRecipes(id: number , userId: number): Promise<any> {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        let tesouraria = await this.repositoryTesouraria.findOne(id, { relations: ["saidas", "entradas", "contagens", "entradas.creditos"] });

        if(tesouraria == null) {
            throw new TreasuryNotFoundException("Tesouraria inexistente");
        }

        if(tesouraria.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }

        let recipes = this.transactionService.getRecipeGeneral(tesouraria.entradas, tesouraria.saidas, tesouraria.saldoInicial, tesouraria.saldoAtual);

        return recipes;
    }

    public async save(tesouraria: Tesouraria) {
        tesouraria.saldoAtual = tesouraria.saldoInicial;

        const result = await this.finByName(tesouraria.nome);

        if(result) {
            throw new IsCreatedEception('O nome da tesouraria já está sendo utilizado', HttpStatus.BAD_REQUEST);
        }

        return this.repositoryTesouraria
            .save(tesouraria)
            .then( e => {
                return {
                    mensagem: 'Criado com sucesso'
                };
            });     
    }   

    public async update(userId: number, tesouraria: Tesouraria) { 

        let treasury = await this.repositoryTesouraria.findOne(tesouraria.id, { relations: ["saidas", "entradas", "contagens", "entradas.creditos"] });
        if(treasury  == null) {
            throw new TreasuryNotFoundException("Tesouraria inexistente");
        }

        if(tesouraria.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }

        if(tesouraria.id == null || tesouraria.id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        tesouraria.saldoAtual = this.transactionService.updateBalance(tesouraria.entradas, tesouraria.saidas, tesouraria.saldoInicial);

        return this.repositoryTesouraria
            .save(tesouraria)
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

        let treasury = await this.repositoryTesouraria.findOne(id, { relations: ["saidas", "entradas", "contagens", "entradas.creditos"] });
        
        if(treasury  == null) {
            throw new TreasuryNotFoundException("Tesouraria inexistente");
        }

        if(treasury.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }

        return this.repositoryTesouraria
            .delete(id)
            .then( e => { 
                return {
                    mensagem: 'Deletado com sucesso'
                };
            });
    }
}