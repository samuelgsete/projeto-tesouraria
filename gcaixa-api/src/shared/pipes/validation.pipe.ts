import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

import { Caixa } from '../models/caixa.entity';
import { Saida } from '../models/saida.entity';
import { Entrada } from '../models/entrada.entity';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
      if(metadata.type === 'body'){
          let _saidas = [];
          value.saidas.forEach(s => {
              _saidas.push(
                new Saida({
                    id: s.id,
                    descricao: s.descricao,
                    registro: s.registro,
                    valor: s.valor,
                    tipo: s.tipo,
                    motivo: s.motivo
                })
              );
          });

          let _entradas = [];

          value.entradas.forEach(e => {
            _entradas.push(
                new Entrada({
                  id:e.id,
                   descricao: e.descricao,
                   valor: e.valor,
                   ofertante: e.ofertante,
                   registro: e.registro,
                   tipo: e.tipo,
                   observacoes: e.observacoes,
                   creditos: e.creditos
                })
            );
          });

          let _caixa = new Caixa({
                          id: value.id,
                          nome: value.nome,
                          saldoInicial: value.saldoInicial,
                          saldoAtual: value.saldoAtual,
                          saidas: _saidas,
                          entradas: _entradas,
                          observacoes: value.observacoes,
                        });
          return _caixa;
      }
    return value;
  }
}