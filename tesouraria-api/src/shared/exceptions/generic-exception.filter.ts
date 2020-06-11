import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { Response } from 'express';

import { IdInvalidException } from "./models/Id-invalid.exception";
import { PermissionDeniedException } from "./models/permission-denied.excepton";
import { TreasuryNotFoundException } from "./models/treasury-not-foud.exception";

@Catch(
    IdInvalidException, 
    PermissionDeniedException, 
    TreasuryNotFoundException
)
export class GenericExceptionFilter implements ExceptionFilter {
    catch(ex: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let httpStatus = 0;
        if(ex instanceof IdInvalidException) {
            httpStatus = HttpStatus.BAD_REQUEST;
        }

        else if(ex instanceof PermissionDeniedException) {
            httpStatus = HttpStatus.FORBIDDEN;
        }

        else if(ex instanceof TreasuryNotFoundException) {
            httpStatus = HttpStatus.NOT_FOUND;
        }

        else {
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
        }
        
        response
            .status(httpStatus)
            .json({
                status: httpStatus,
                details: ex.message,
                redirect: true,
            });
    }  
}