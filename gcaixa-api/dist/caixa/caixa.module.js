"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const caixa_controller_1 = require("./caixa.controller");
const caixa_service_1 = require("./caixa.service");
const caixa_entity_1 = require("../shared/models/caixa.entity");
const saida_entity_1 = require("../shared/models/saida.entity");
const entrada_entity_1 = require("../shared/models/entrada.entity");
const credito_entity_1 = require("../shared/models/credito.entity");
const relatorio_controller_1 = require("./relatorio/relatorio.controller");
const relatorio_service_1 = require("./relatorio/relatorio.service");
const contagem_entity_1 = require("../shared/models/contagem.entity");
let CaixaModule = class CaixaModule {
};
CaixaModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                caixa_entity_1.Caixa,
                saida_entity_1.Saida,
                entrada_entity_1.Entrada,
                credito_entity_1.Credito,
                contagem_entity_1.Contagem
            ])],
        controllers: [caixa_controller_1.CaixaController, relatorio_controller_1.RelatorioController],
        providers: [caixa_service_1.CaixaService, relatorio_service_1.RelatorioService]
    })
], CaixaModule);
exports.CaixaModule = CaixaModule;
//# sourceMappingURL=caixa.module.js.map