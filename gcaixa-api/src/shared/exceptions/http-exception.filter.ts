import { 
    Catch, 
    ExceptionFilter,
    ArgumentsHost,
    HttpException, BadRequestException,
    NotFoundException, 
    InternalServerErrorException,
    UnauthorizedException,
    ForbiddenException, 
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(
    BadRequestException, 
    NotFoundException, 
    InternalServerErrorException,
    ForbiddenException,
    UnauthorizedException,
)
export class HttpExceptionFilter implements ExceptionFilter {
    
  catch(ex: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = ex.getStatus();
    const request = ctx.getRequest<Request>();
    let message: any = ex.message.message;

    console.log(ex.message.message[0].constraints);
    if(typeof ex.message.message == 'object') {
        message = ex.message.message[0].constraints.length;
        console.log(ex.message.message[0].constraints.isDefined);
    }

    response
        .status(status)
        .json({
            codigo: status,
            tipo: ex.message.error,
            detalhes:  message,
            caminho: request.url
        });
  }
}