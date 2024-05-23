import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse, Reservas } from '../models/reservas.models';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private readonly API_URL = 'http://127.0.0.1:8000/api';
  constructor(
    private http: HttpClient
  ) { }

  getReservas(page: number = 1): Observable<PaginatedResponse<Reservas>> {
    return this.http.get<PaginatedResponse<Reservas>>(`${this.API_URL}/reservas?page=${page}`);
  }

  getReserva(id: number):Observable<Reservas> {
    return this.http.get<Reservas>(`${this.API_URL}/reservas/${id}`);
  }

  createReserva(data: Reservas):Observable<Reservas> {
    return this.http.post<Reservas>(`${this.API_URL}/reservas`, data);
  }

  updateReserva(id:number,  data: Reservas):Observable<Reservas> {
    return this.http.put<Reservas>(`${this.API_URL}/reservas/${id}`, data);
  }

  deleteReserva(id:number):Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/reservas/${id}`);
  }

  changeStatusReserva(id:number, activo:number):Observable<any> {
    return this.http.get<any>(`${this.API_URL}/reservas/${id}/estado/${activo}`);
  }
}
