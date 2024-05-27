import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { authCredentials, authUserRegister } from '../models/auth.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = environment.base_url;

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: authCredentials): Observable<authCredentials> {
    return this.http.post<authCredentials>(`${this.API_URL}/login`, credentials);
  }

  register(user: authUserRegister): Observable<authUserRegister> {
    return this.http.post<authUserRegister>(`${this.API_URL}/register`, user);
  }

  logout(): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/logout`);
  }
}