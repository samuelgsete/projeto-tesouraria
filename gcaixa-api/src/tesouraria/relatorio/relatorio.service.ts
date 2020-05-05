import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tesouraria } from 'src/shared/models/tesouraria.entity';
import { IdInvalidException } from 'src/shared/exceptions/modelos/Id-invalid.exception';
import { Relatorio } from './relatorio.entity';
import { throws } from 'assert';

@Injectable()
export class RelatorioService {

    public constructor(@InjectRepository(Tesouraria) private repositoryTesouraria: Repository<Tesouraria>) { }

    public async findById(id: number): Promise<Tesouraria> {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }
        return this.repositoryTesouraria.findOne(id, { relations: ["saidas", "entradas", "entradas.creditos"] })
    }

    public async findReportByDate(id: number, month: number, year: number): Promise<any> {
        let tesouraria = await this.findById(id);

        if(tesouraria == null) {
            throw new IdInvalidException('O id informado não está cadastrado');
        }

        let _entradas = tesouraria.entradas.filter( e => {
            return e.registro.getMonth() == month && e.registro.getFullYear() == year;
        });

        let _saidas= tesouraria.saidas.filter( s => {
            return s.registro.getMonth() == month && s.registro.getFullYear() == year;
        });

        let relatorio = new Relatorio({
            nomeTesouraria: tesouraria.nome,
            saldoInicial: tesouraria.saldoInicial,
            saldoAtual: tesouraria.saldoAtual,
            entradas: _entradas,
            saidas: _saidas,
        });

        relatorio.calcularSaldoDoMes();

        return relatorio;
    }
}
