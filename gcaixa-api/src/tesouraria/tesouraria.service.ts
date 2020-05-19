import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like} from 'typeorm';

import { Tesouraria } from 'src/shared/models/tesouraria.entity';
import { FiltroBusca } from 'src/shared/models/filtro-busca';
import { IdInvalidException } from 'src/shared/exceptions/modelos/Id-invalid.exception';

@Injectable()
export class TesourariaService {

    public constructor(@InjectRepository(Tesouraria) private repositoryTesouraria: Repository<Tesouraria>) {}

    public async findAll(filtro: FiltroBusca): Promise<any> {
        const [result, total] = await this.repositoryTesouraria.findAndCount(
            {
                relations: ["saidas", "entradas", "contagens", "entradas.creditos"],
                where: { nome: Like(filtro.palavra) },
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

    public async findById(id: number): Promise<Tesouraria> {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }
        return this.repositoryTesouraria.findOne(id, { relations: ["saidas", "entradas", "contagens", "entradas.creditos"] });
    }

    public async getReport(id: number, ano: number, mes: number): Promise<any> {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        let tesouraria = await this.repositoryTesouraria.findOne(id, { relations: ["saidas", "entradas", "contagens", "entradas.creditos"] });
        let relatorios = tesouraria.obterRelatorioDeReceitas(ano, mes);
        
        return relatorios;
    }

    public async getHistory(id: number, ano:number): Promise<any> {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        let tesouraria = await this.repositoryTesouraria.findOne(id, { relations: ["saidas", "entradas", "contagens", "entradas.creditos"] });
        let receitas = tesouraria.obterHistoricoMensalDeReceitas(ano);
        
        return receitas;
    }

    public async getRecipes(id: number): Promise<any> {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        let tesouraria = await this.findById(id);
        let recipes = tesouraria.obeterReceitas();
        return recipes;
    }

    public async save(tesouraria: Tesouraria) {
        tesouraria.saldoAtual = tesouraria.saldoInicial;
        return this.repositoryTesouraria
            .save(tesouraria)
            .then( e => {
                return {
                    mensagem: 'Criado com sucesso'
                };
            });     
    }   

    public async update(tesouraria: Tesouraria) {  
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

    public async delete(id: number) {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }
        return this.repositoryTesouraria
            .delete(id)
            .then( e => { 
                if(e.affected == 0) {
                    return {
                        mensagem: 'O Id informado não está cadastrado'
                    }; 
                }
                return {
                    mensagem: 'Deletado com sucesso'
                };
            });
    }
}