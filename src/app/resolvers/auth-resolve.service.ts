import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthResolveService {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> | boolean {
    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {
      return this.authService.getCurrentUser();
    } else {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        this.authService.clearUser();
      }
      
      return false;
    }
  }
}
