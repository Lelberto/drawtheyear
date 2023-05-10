import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { Context } from '../constants/logger.constants';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor<Response> {

  private readonly logger = new Logger(Context.REQUEST);

  public intercept(context: ExecutionContext, next: CallHandler<Response>): Observable<Response> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    this.logger.log(`${req.hostname} | ${req.method} ${req.originalUrl} - ${res.statusCode}`);
    return next.handle();
  }
}
