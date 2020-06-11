import { 
    Catch, 
    ExceptionFilter,
    ArgumentsHost,
    HttpException, BadRequestException,
    NotFoundException, 
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';

import { Response } from 'express';

@Catch(
    BadRequestException,
    NotFoundException, 
    InternalServerErrorException,
    UnauthorizedException,
)
export class HttpExceptionFilter implements ExceptionFilter {
    
  catch(ex: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = ex.getStatus();
    let message: any = ex.message.message;
    
    response
        .status(status)
        .json({
            status: status,
            details:  message,
            redirect: true,
        });
  }
}