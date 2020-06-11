import { ExceptionFilter, ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { Response } from 'express';

import { IsCreatedEception } from "./models/is-created.exception";

@Catch(IsCreatedEception)
export class IsCreatedExceptionFeilter implements ExceptionFilter {
    catch(ex: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        
        response
            .status(HttpStatus.BAD_REQUEST)
            .json({
                status: HttpStatus.BAD_REQUEST,
                details: ex.message,
                redirect: false
            });
    }
}