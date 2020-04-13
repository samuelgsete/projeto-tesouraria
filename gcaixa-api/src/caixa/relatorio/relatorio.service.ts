import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Caixa } from 'src/shared/models/caixa.entity';
import { IdInvalidException } from 'src/shared/exceptions/modelos/Id-invalid.exception';
import { Relatorio } from './relatorio.entity';
import { throws } from 'assert';

@Injectable()
export class RelatorioService {

    public constructor(@InjectRepository(Caixa) private repositoryCaixa: Repository<Caixa>) { }

    public async findById(id: number): Promise<Caixa> {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }
        return this.repositoryCaixa.findOne(id, { relations: ["saidas", "entradas", "entradas.creditos"] })
    }

    public async findReportByDate(id: number, month: number, year: number): Promise<any> {
        let caixa = await this.findById(id);

        if(caixa == null) {
            throw new IdInvalidException('O id informado não está cadastrado');
        }

        let _entradas = caixa.entradas.filter( e => {
            return e.registro.getMonth() == month && e.registro.getFullYear() == year;
        });

        let _saidas= caixa.saidas.filter( s => {
            return s.registro.getMonth() == month && s.registro.getFullYear() == year;
        });

        let relatorio = new Relatorio({
            nomeCaixa: caixa.nome,
            saldoInicial: caixa.saldoInicial,
            saldoAtual: caixa.saldoAtual,
            entradas: _entradas,
            saidas: _saidas,
        });

        relatorio.calcularSaldoDoMes();

        return relatorio;
    }
}
