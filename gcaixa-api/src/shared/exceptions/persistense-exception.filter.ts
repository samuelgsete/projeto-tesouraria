import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { QueryFailedError } from "typeorm";
import { Response } from 'express';


@Catch(QueryFailedError)
export class PersistenceExceptionFilter implements ExceptionFilter {
    catch(ex: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const detalhes = this.generateMessageError(ex);
        console.log(ex);
        response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({
                codigo: HttpStatus.INTERNAL_SERVER_ERROR,
                tipo: ex.name,
                detalhes: detalhes
            });
    }

    public generateMessageError(ex: any): string {
        let message: string = '';
        if(ex.code == TypeError.NOT_NULL) {
            message += "A propriedade '" + ex.column + "' não pode ser nula";
        }
        else if(ex.code == TypeError.UNIQUE) {
            message += "O valor já foi cadastrada";
        }
        else if(ex.code == TypeError.LONG_VALUE) {
            message += "O valor contém uma cadeia de caractares muito longa"
        }
        else if(ex.code == TypeError.NOT_INTEGER) {
            message += "O valor precisa ser numérico"
        }
        return message;
    }
}

export enum TypeError {
    NOT_NULL = '23502',
    UNIQUE = '23505',
    LONG_VALUE = '22001',
    NOT_INTEGER = '22P02' 
}