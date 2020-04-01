import { 
    Catch, 
    ExceptionFilter,
    ArgumentsHost,
    HttpException, BadRequestException,
    NotFoundException, 
    InternalServerErrorException,
    UnauthorizedException, 
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(
    BadRequestException, 
    NotFoundException, 
    InternalServerErrorException,
    UnauthorizedException
)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(ex: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = ex.getStatus();
    const request = ctx.getRequest<Request>();

    console.log(ex);

    response
        .status(status)
        .json({
            codigo: status,
            tipo: ex.message.error,
            detalhes: ex.message.message,
            caminho: request.url
        });
  }
}