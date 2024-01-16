import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const formatResponse = (item: any): any => {
  return {
    id: item._id,
    title: item.title,
    description: item.description,
    url: item.url,
    content: item.content,
  };
};

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('interceptor');
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          // If the response is an array, format each item
          return data.map((item) => formatResponse(item));
        } else {
          // If the response is a single item, format it
          return formatResponse(data);
        }
      }),
    );
  }
}
