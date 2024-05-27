import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const isUserAuthenticatedGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = inject(TokenService).isAuthenticated();

  if (isAuthenticated)
    return true;

  inject(Router).navigateByUrl('/login');
    return false;
};

export const isGuestGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = inject(TokenService).isAuthenticated();

  if (!isAuthenticated)
    return true;

  inject(Router).navigateByUrl('/hoteles');
    return false;
};

