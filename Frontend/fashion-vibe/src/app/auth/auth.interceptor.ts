import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';


export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    console.log('Intercepting request to:', req.url);
    console.log('Token:', token);

    if (req.url.includes('/api/login') || req.url.includes('/api/register')) {
      return next(req);
    }

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next(cloned);
    }
  }

  return next(req);
};



