import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
export declare class PersistenceExceptionFilter implements ExceptionFilter {
    catch(ex: any, host: ArgumentsHost): void;
    generateMessageError(ex: any): string;
}
export declare enum TypeError {
    NOT_NULL = "23502",
    UNIQUE = "23505",
    LONG_VALUE = "22001",
    NOT_INTEGER = "22P02"
}
