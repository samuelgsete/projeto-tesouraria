"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./shared/exceptions/http-exception.filter");
const persistense_exception_filter_1 = require("./shared/exceptions/persistense-exception.filter");
const generic_exception_filter_1 = require("./shared/exceptions/generic-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.useGlobalFilters(new generic_exception_filter_1.GenericExceptionFilter(), new http_exception_filter_1.HttpExceptionFilter(), new persistense_exception_filter_1.PersistenceExceptionFilter());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map