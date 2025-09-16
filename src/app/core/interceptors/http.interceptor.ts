import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newRequest: HttpRequest<any> = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.userToken}`,
      },
    });

    const unauthorizedStatus = [401, 402];
    return next.handle(newRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (unauthorizedStatus.includes(error.status)) {
          localStorage.removeItem('userToken');
          this.authService.isLoggedSub.next(false);
          this.router.navigateByUrl('/signin');
        }
        return throwError(error);
      })
    );
  }
}
