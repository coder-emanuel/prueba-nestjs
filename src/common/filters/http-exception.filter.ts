import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

 
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';

  
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } 
   
    else if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST; 
      message = this.getTypeOrmErrorMessage(exception);
    } 

    else if (exception instanceof Error) {
      message = exception.message;
    }


    console.error('Exception:', exception);


    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: typeof message === 'string' ? message : JSON.stringify(message),
    });
  }

  private getTypeOrmErrorMessage(exception: QueryFailedError): string {
    return exception.message;
  }
}
