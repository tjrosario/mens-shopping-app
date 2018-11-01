import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CanActivateViaAdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {
    const authService = this.authService;

    if (authService.isAuthenticated()) {
      if (authService.getCurrentUserRole() === 'admin') {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
