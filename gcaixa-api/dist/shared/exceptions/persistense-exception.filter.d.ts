import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
export declare class PersistenceExceptionFilter implements ExceptionFilter {
    catch(ex: any, host: ArgumentsHost): void;
}
