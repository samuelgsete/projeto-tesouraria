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
const treasury_module_1 = require("./treasury/treasury.module");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./users/user.module");
const treasury_entity_1 = require("./shared/models/treasury.entity");
const expense_entity_1 = require("./shared/models/expense.entity");
const recipe_entity_1 = require("./shared/models/recipe.entity");
const credit_entity_1 = require("./shared/models/credit.entity");
const inventory_entity_1 = require("./shared/models/inventory.entity");
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
                    database: 'treasurydb',
                    entities: [
                        treasury_entity_1.Treasury,
                        expense_entity_1.Expense,
                        recipe_entity_1.Recipe,
                        credit_entity_1.Credit,
                        inventory_entity_1.Inventory,
                        user_entity_1.User
                    ],
                    synchronize: true,
                }),
                treasury_module_1.TreasuryModule,
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