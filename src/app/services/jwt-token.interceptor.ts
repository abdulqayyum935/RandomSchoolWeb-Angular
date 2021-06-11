import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  apiWithNoHeader: string[]
  constructor(private storage: StorageService) {
    this.apiWithNoHeader = [
      'api/Auth/checkEmailAvailability',
      'api/Auth/register',
      'api/Auth/login',
      'api/Auth/refreshToken'
    ]

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.apiWithNoHeader.some(x=>request.url.endsWith(x))){
      return next.handle(request);
    }
    
    const authReq = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + this.storage.getToken() || '')
    });
    return next.handle(authReq);

  }
}
