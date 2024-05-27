import { Injectable } from '@angular/core';
import { Usuarios } from '../models/usuarios.models';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handleToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  handleUsers(user: Usuarios):void {
    const userString = JSON.stringify(user);
    localStorage.setItem('usuario', userString);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token')
  }
  

  revokeToken(): void {
    localStorage.removeItem('access_token')
  }

  isAuthenticated(): boolean {
    if( this.getToken())
      return true;

    return false;
  }
}
