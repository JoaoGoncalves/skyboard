import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {

  const started = performance.now();
  const auth = req.headers.has('Authorization') ? 'Com Token' : 'Sem Token';
  console.log(`➜ ${req.method} ${req.urlWithParams} (${auth})`);

  return next(req).pipe(
    finalize(()=>{
      const ms = Math.round(performance.now() - started);
      console.log(`⬅︎ ${req.method} ${req.urlWithParams} - ${ms} ms`);
    })
  )

};
