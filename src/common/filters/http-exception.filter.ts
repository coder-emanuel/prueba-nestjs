import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

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
    } else if (this.isMysqlError(exception)) {
      const mysqlError = exception as any; 
      switch (mysqlError.code) {
        case 'ER_DUP_ENTRY':
          status = HttpStatus.CONFLICT;
          message = 'Error de clave duplicada';
          break;
        default:
          message = 'Error de base de datos MySQL';
      }
    } else if (exception instanceof Error) {
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

  private isMysqlError(exception: unknown): boolean {
    return exception && typeof exception === 'object' && 'code' in (exception as object) && 'sqlMessage' in (exception as object);
  }
}
