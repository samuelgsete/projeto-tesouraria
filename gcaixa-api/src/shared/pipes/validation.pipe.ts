import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

import { Tesouraria } from '../models/tesouraria.entity';
import { Saida } from '../models/saida.entity';
import { Entrada } from '../models/entrada.entity';
import { Contagem } from '../models/contagem.entity';
import { Credito } from '../models/credito.entity';

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

          let _contagens = [];

          value.contagens.forEach(c  => {
            _contagens.push(
                new Contagem({
                  id: c.id,
                  saldoReal: c.saldoReal,
                  registro: c.registro     
              })
            )
          });

          let _tesouraria = new Tesouraria({
                          id: value.id,
                          nome: value.nome,
                          saldoInicial: value.saldoInicial,
                          saldoAtual: value.saldoAtual,
                          saidas: _saidas,
                          entradas: _entradas,
                          contagens: _contagens,
                          observacoes: value.observacoes,
                        });   
          return _tesouraria;
      }

    return value;
  }

  /*public gerarArrayCreditos(arr: any[]): Credito[] {
    let creditos: Credito[] = [];

    arr.forEach( item => {
      creditos.push(
        new Credito({
          id: item.id,
          titular: item.titular,
          valor: item.valor,
          abertura: item.abertura,
          encerramento: item.encerramento,
          situacao: item.situacao
        })
      )
    });

    return creditos;
  }*/
}