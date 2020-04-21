"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const caixa_entity_1 = require("../shared/models/caixa.entity");
const filtro_busca_1 = require("../shared/models/filtro-busca");
const Id_invalid_exception_1 = require("../shared/exceptions/modelos/Id-invalid.exception");
let CaixaService = class CaixaService {
    constructor(repositoryCaixa) {
        this.repositoryCaixa = repositoryCaixa;
    }
    async findAll(filtro) {
        const [result, total] = await this.repositoryCaixa.findAndCount({
            relations: ["saidas", "entradas", "contagens", "entradas.creditos"],
            where: { nome: typeorm_2.Like(filtro.palavra) },
            order: { nome: "ASC" },
            take: 6,
            skip: filtro.nextPage()
        });
        return {
            data: result,
            count: total
        };
    }
    async findById(id) {
        if (id <= 0) {
            throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
        }
        return this.repositoryCaixa.findOne(id, { relations: ["saidas", "entradas", "contagens", "entradas.creditos"] });
    }
    async save(caixa) {
        caixa.saldoAtual = caixa.saldoInicial;
        return this.repositoryCaixa
            .save(caixa)
            .then(e => {
            return {
                mensagem: 'Criado com sucesso'
            };
        });
    }
    async update(caixa) {
        caixa.atualizarSaldo();
        if (caixa.id == null || caixa.id <= 0) {
            throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
        }
        return this.repositoryCaixa
            .save(caixa)
            .then(e => {
            return {
                mensagem: 'Atualizado com sucesso'
            };
        });
    }
    async delete(id) {
        if (id <= 0) {
            throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
        }
        return this.repositoryCaixa
            .delete(id)
            .then(e => {
            if (e.affected == 0) {
                return {
                    mensagem: 'O Id informado não está cadastrado'
                };
            }
            return {
                mensagem: 'Deletado com sucesso'
            };
        });
    }
};
CaixaService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(caixa_entity_1.Caixa)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CaixaService);
exports.CaixaService = CaixaService;
//# sourceMappingURL=caixa.service.js.map