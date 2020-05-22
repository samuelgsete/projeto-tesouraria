import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like} from 'typeorm';

import { Tesouraria } from 'src/shared/models/tesouraria.entity';
import { FiltroBusca } from 'src/shared/models/filtro-busca';
import { IdInvalidException } from 'src/shared/exceptions/modelos/Id-invalid.exception';
import { PermissionDeniedException } from 'src/shared/exceptions/modelos/permission-denied.excepton';
import { TreasuryNotFoundException } from 'src/shared/exceptions/modelos/treasury-not-foud.exception';

@Injectable()
export class TesourariaService {

    public constructor(@InjectRepository(Tesouraria) private repositoryTesouraria: Repository<Tesouraria>) {}

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

    public async getReport(id: number, userId: number, ano: number, mes: number): Promise<any> {
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

        let relatorios = tesouraria.obterRelatorioDeReceitas(ano, mes);
        
        return relatorios;
    }

    public async getHistory(userId: number, id: number, ano:number): Promise<any> {
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
        
        let receitas = tesouraria.obterHistoricoMensalDeReceitas(ano);
        
        return receitas;
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

        let recipes = tesouraria.obeterReceitas();

        return recipes;
    }

    public async save(userId: number, tesouraria: Tesouraria) {

        if(tesouraria.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }

        tesouraria.saldoAtual = tesouraria.saldoInicial;

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

        tesouraria.atualizarSaldo();

        if(tesouraria.id == null || tesouraria.id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

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