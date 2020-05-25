import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
export declare class GenericExceptionFilter implements ExceptionFilter {
    catch(ex: any, host: ArgumentsHost): void;
}
