import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuarios } from '../models/usuarios.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API_URL = 'http://127.0.0.1:8000/api';
  constructor(
    private http: HttpClient
  ) { }

  getUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.API_URL}/hoteles`);
  }

  getUsuario(id: number):Observable<Usuarios> {
    return this.http.get<Usuarios>(`${this.API_URL}/user/${id}`);
  } 

  createUsuario(data: Usuarios):Observable<Usuarios> {
    return this.http.post<Usuarios>(`${this.API_URL}/user}`, data);
  } 

  updateUsuario(id:number,  data: Usuarios):Observable<Usuarios> {
    return this.http.put<Usuarios>(`this.API_URL}/user/${id}`, data);
  } 

  deleteUsuario(id:number):Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/user/${id}`);
  } 
}
