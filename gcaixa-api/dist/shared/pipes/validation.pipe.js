"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const caixa_entity_1 = require("../models/caixa.entity");
const saida_entity_1 = require("../models/saida.entity");
const entrada_entity_1 = require("../models/entrada.entity");
const contagem_entity_1 = require("../models/contagem.entity");
let ValidationPipe = class ValidationPipe {
    transform(value, metadata) {
        if (metadata.type === 'body') {
            let _saidas = [];
            value.saidas.forEach(s => {
                _saidas.push(new saida_entity_1.Saida({
                    id: s.id,
                    descricao: s.descricao,
                    registro: s.registro,
                    valor: s.valor,
                    tipo: s.tipo,
                    motivo: s.motivo
                }));
            });
            let _entradas = [];
            value.entradas.forEach(e => {
                _entradas.push(new entrada_entity_1.Entrada({
                    id: e.id,
                    descricao: e.descricao,
                    valor: e.valor,
                    ofertante: e.ofertante,
                    registro: e.registro,
                    tipo: e.tipo,
                    observacoes: e.observacoes,
                    creditos: e.creditos
                }));
            });
            let _contagens = [];
            value.contagens.forEach(c => {
                _contagens.push(new contagem_entity_1.Contagem({
                    id: c.id,
                    saldoReal: c.saldoReal,
                    registro: c.registro
                }));
            });
            let _caixa = new caixa_entity_1.Caixa({
                id: value.id,
                nome: value.nome,
                saldoInicial: value.saldoInicial,
                saldoAtual: value.saldoAtual,
                saidas: _saidas,
                entradas: _entradas,
                contagens: _contagens,
                observacoes: value.observacoes,
            });
            return _caixa;
        }
        return value;
    }
};
ValidationPipe = __decorate([
    common_1.Injectable()
], ValidationPipe);
exports.ValidationPipe = ValidationPipe;
//# sourceMappingURL=validation.pipe.js.map