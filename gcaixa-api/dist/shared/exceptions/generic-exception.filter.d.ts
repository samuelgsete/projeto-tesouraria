import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
export declare class GenericaExceptionsFilter implements ExceptionFilter {
    catch(ex: any, host: ArgumentsHost): void;
}
