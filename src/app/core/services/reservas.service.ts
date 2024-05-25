import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse, Reservas } from '../models/reservas.models';

import { environment } from 'src/environments/environment';

const API_URL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private readonly API_URL = 'http://127.0.0.1:8000/api';
  constructor(
    private http: HttpClient
  ) { }

  getReservas(page: number = 1, limit:number, orderBy:string, ascending:string, url?:string): Observable<PaginatedResponse<Reservas>> {
    return this.http.get<PaginatedResponse<Reservas>>(`${API_URL}/reservas?page=${page}&limit=${limit}&orderBy=${orderBy}&ascending=${ascending}${url ? url : ''}`);
  }

  getReserva(id: number):Observable<Reservas> {
    return this.http.get<Reservas>(`${API_URL}/reservas/${id}`);
  }

  createReserva(data: Reservas):Observable<Reservas> {
    return this.http.post<Reservas>(`${API_URL}/reservas`, data);
  }

  updateReserva(id:number,  data: Reservas):Observable<Reservas> {
    return this.http.put<Reservas>(`${API_URL}/reservas/${id}`, data);
  }

  deleteReserva(id:number):Observable<any> {
    return this.http.delete<any>(`${API_URL}/reservas/${id}`);
  }

  changeStatusReserva(id:number, activo:number):Observable<any> {
    return this.http.get<any>(`${API_URL}/reservas/${id}/estado/${activo}`);
  }
}
