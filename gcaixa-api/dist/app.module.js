"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const tesouraria_module_1 = require("./tesouraria/tesouraria.module");
const tesouraria_entity_1 = require("./shared/models/tesouraria.entity");
const saida_entity_1 = require("./shared/models/saida.entity");
const entrada_entity_1 = require("./shared/models/entrada.entity");
const credito_entity_1 = require("./shared/models/credito.entity");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./users/user.module");
const contagem_entity_1 = require("./shared/models/contagem.entity");
const user_entity_1 = require("./shared/models/user.entity");
let AppModule = (() => {
    let AppModule = class AppModule {
    };
    AppModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: 'postgres',
                    password: 'postgres',
                    database: 'tesourariadb',
                    entities: [
                        tesouraria_entity_1.Tesouraria,
                        saida_entity_1.Saida,
                        entrada_entity_1.Entrada,
                        credito_entity_1.Credito,
                        contagem_entity_1.Contagem,
                        user_entity_1.User
                    ],
                    synchronize: true,
                }),
                tesouraria_module_1.TesourariaModule,
                auth_module_1.AuthModule,
                user_module_1.UserModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService],
        })
    ], AppModule);
    return AppModule;
})();
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map