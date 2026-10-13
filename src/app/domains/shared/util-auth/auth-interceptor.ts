import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from './auth-store';
import { ConfigService } from '../util-common/config-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = inject(AuthStore).token();
  const apiUrl = inject(ConfigService).apiUrl;

  if (!token ||!req.url.startsWith(apiUrl)){
    return next(req);
  }

  const authReq = req.clone({setHeaders: {Authorization: `Bearer ${token}`}})
  return next(authReq);
};
