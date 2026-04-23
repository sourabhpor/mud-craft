// src/utils/successResponse.interceptor.ts

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class SuccessResponseInterceptor<T>
  implements NestInterceptor<T>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        status: true,
        message: data?.message || 'Success',
        data: data?.data ?? data,
      })),
    );
  }
}