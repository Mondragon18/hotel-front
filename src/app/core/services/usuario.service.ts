import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuarios } from '../models/usuarios.models';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.prod';

const API_URL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {  constructor(
    private http: HttpClient
  ) { }

  getUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${API_URL}/hoteles`);
  }

  getUsuario(id: number):Observable<Usuarios> {
    return this.http.get<Usuarios>(`${API_URL}/user/${id}`);
  } 

  createUsuario(data: Usuarios):Observable<Usuarios> {
    return this.http.post<Usuarios>(`${API_URL}/user}`, data);
  } 

  updateUsuario(id:number,  data: Usuarios):Observable<Usuarios> {
    return this.http.put<Usuarios>(`API_URL}/user/${id}`, data);
  } 

  deleteUsuario(id:number):Observable<any> {
    return this.http.delete<any>(`${API_URL}/user/${id}`);
  } 
}
