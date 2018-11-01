import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private inj: Injector
  ) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.inj.get(AuthService);
    const utilsService = this.inj.get(UtilsService);

    req = req.clone({
      withCredentials: true
    });

    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        const { status } = err;
        const isAuthenticated = authService.isAuthenticated();

        if (status === 401) {
          if (isAuthenticated) {
            authService.logout()
              .subscribe(() => {
                authService.clearUser();

                const currentUrl = this.router.url;
                if (currentUrl === '/home') {
                  if (utilsService.isBrowser()) {
                    window.location.reload();
                  }
                } else {
                  this.router.navigate(['/login']);
                }
              });
          } else {
            this.router.navigate(['/']);
          }
        }
      }
    });
  }
}
