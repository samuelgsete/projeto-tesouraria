import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like} from 'typeorm';

import { Caixa } from 'src/shared/models/caixa.entity';
import { FiltroBusca } from 'src/shared/models/filtro-busca';
import { IdInvalidException } from 'src/shared/exceptions/modelos/Id-invalid.exception';

@Injectable()
export class CaixaService {

    constructor(@InjectRepository(Caixa) private repositoryCaixa: Repository<Caixa>) {}

    public async findAll(filtro: FiltroBusca): Promise<any> {
        const [result, total] = await this.repositoryCaixa.findAndCount(
            {
                relations: ["saidas", "entradas"],
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

    public async findById(id: number): Promise<Caixa> {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }
        return this.repositoryCaixa.findOne(id, { relations: ["saidas", "entradas", "entradas.creditos"] })
    }

    public async save(caixa: Caixa) {
        caixa.saldoAtual = caixa.saldoInicial;
        return this.repositoryCaixa
            .save(caixa)
            .then( e => {
                return {
                    mensagem: 'Criado com sucesso'
                };
            });     
    }   

    public async update(caixa: Caixa) {
        caixa.atualizarSaldo();
        if(caixa.id == null || caixa.id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        return this.repositoryCaixa
            .save(caixa)
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
        return this.repositoryCaixa
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