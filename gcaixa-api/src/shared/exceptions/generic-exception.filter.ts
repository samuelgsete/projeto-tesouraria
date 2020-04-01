import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { Response } from 'express';

import { InsufficientFunds } from "./modelos/insufficient-funds.exception";

@Catch(InsufficientFunds)
export class GenericaExceptionsFilter implements ExceptionFilter {
    catch(ex: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({
                codigo: HttpStatus.INTERNAL_SERVER_ERROR,
                tipo: ex.name,
                detalhes: ex.message
            });
    }  
}