import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
export declare class ObjectExceptionFilter implements ExceptionFilter {
    catch(ex: any, host: ArgumentsHost): void;
}
