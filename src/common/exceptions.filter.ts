import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const errorMessages = Array.isArray(errorResponse.message)
      ? errorResponse.message
      : [errorResponse.message || errorResponse];

    console.log(
      errorResponse.error,
      exception.getResponse(),
      status,
      'rrrrrrrr',
    );

    console.log(errorMessages);

    response.status(status).json({
      success: false,
      data: null,
      message: errorResponse.message,
      error: errorMessages,
    });
  }
}
