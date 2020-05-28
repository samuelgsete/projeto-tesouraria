import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { QueryFailedError } from "typeorm";
import { Response } from 'express';

@Catch(QueryFailedError)
export class PersistenceExceptionFilter implements ExceptionFilter {

    catch(ex: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const detalhes = 'Houve um erro na escrita dos dados';
        console.log(ex);
        response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                details: detalhes,
                redirect: true
            });
    }
}