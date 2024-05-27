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

  getUsers(): any | null {
    const usuarioStr = localStorage.getItem('usuario');
    return usuarioStr ? JSON.parse(usuarioStr) : null;
  }

  revokeToken(): void {
    localStorage.removeItem('access_token')
  }

  isAuthenticated(): boolean {
    if( this.getToken())
      return true;

    return false;
  }

  isAuthPerson(): boolean {
    const usuario = this.getUsers();
    if (usuario && usuario.persona === 'pasajero') {
      console.log(usuario.persona);
      return true;
    }
    return false;
  }

  isAuthAgente(): boolean {
    const usuario = this.getUsers();
    if (usuario && usuario.persona === 'agente') {
      console.log(usuario.persona);
      return true;
    }
    return false;
  }
}
