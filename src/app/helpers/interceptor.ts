import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('request', req.method, req.url);
  console.log('authInterceptor');

  if (req.url.startsWith('http://localhost:4200/about')) {
    // Setting a dummy token
    const headers = req.headers.set('Authorization', 'Bearer-1234');
    req = req.clone({ headers });
    console.log('Were home');
  }

  return next(req).pipe(tap((resp) => console.log('response', resp)));
};
