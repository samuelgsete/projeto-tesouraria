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
const caixa_service_1 = require("./caixa.service");
const caixa_entity_1 = require("../shared/models/caixa.entity");
const filtro_busca_1 = require("../shared/models/filtro-busca");
const validation_pipe_1 = require("../shared/pipes/validation.pipe");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let CaixaController = class CaixaController {
    constructor(service) {
        this.service = service;
    }
    findPaginete(filtro, page) {
        return this.service.findAll(new filtro_busca_1.FiltroBusca(filtro, page));
    }
    findById(id) {
        return this.service.findById(id);
    }
    create(caixa) {
        return this.service.save(caixa);
    }
    update(caixa) {
        return this.service.update(caixa);
    }
    delete(id) {
        return this.service.delete(id);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('filtro')), __param(1, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CaixaController.prototype, "findPaginete", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CaixaController.prototype, "findById", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [caixa_entity_1.Caixa]),
    __metadata("design:returntype", void 0)
], CaixaController.prototype, "create", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Body(new validation_pipe_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [caixa_entity_1.Caixa]),
    __metadata("design:returntype", void 0)
], CaixaController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CaixaController.prototype, "delete", null);
CaixaController = __decorate([
    common_1.Controller('caixa'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [caixa_service_1.CaixaService])
], CaixaController);
exports.CaixaController = CaixaController;
//# sourceMappingURL=caixa.controller.js.map