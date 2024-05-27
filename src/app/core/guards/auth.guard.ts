import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const isUserAuthenticatedGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = inject(TokenService).isAuthenticated();

  if (isAuthenticated)
    return true;

  inject(Router).navigateByUrl('/authentication/login');
    return false;
};

export const isGuestGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = inject(TokenService).isAuthenticated();

  if (!isAuthenticated)
    return true;

  inject(Router).navigateByUrl('/hoteles');
    return false;
};

export const isPasajeroGuard: CanActivateFn = (route, state) => {
  const isPasajero = inject(TokenService).isAuthPerson();

  if (isPasajero)
    return true;

  inject(Router).navigateByUrl('/authentication/login');
    return false;
};

export const isAgenteGuard: CanActivateFn = (route, state) => {
  const isPasajero = inject(TokenService).isAuthAgente();

  if (isPasajero)
    return true;

  inject(TokenService).revokeToken();
  inject(Router).navigateByUrl('/authentication/login');
    return false;
};



