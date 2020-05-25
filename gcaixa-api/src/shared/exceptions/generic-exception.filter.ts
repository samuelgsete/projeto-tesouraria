import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { Response } from 'express';

import { IdInvalidException } from "./modelos/Id-invalid.exception";
import { PermissionDeniedException } from "./modelos/permission-denied.excepton";
import { TreasuryNotFoundException } from "./modelos/treasury-not-foud.exception";

@Catch(
        IdInvalidException, 
        PermissionDeniedException, 
        TreasuryNotFoundException
)
export class GenericExceptionFilter implements ExceptionFilter {
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