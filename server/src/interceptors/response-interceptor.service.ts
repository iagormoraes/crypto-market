import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const res = context.switchToHttp().getResponse() as Response;

    return next.handle().pipe(
      map((data) => ({
        status: res.statusCode,
        data: data,
      })),
    );
  }
}
