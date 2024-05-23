import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habitacion, PaginatedResponse } from '../models/habitaciones.models';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {

  private readonly API_URL = 'http://127.0.0.1:8000/api';
  constructor(
    private http: HttpClient
  ) { }

  getHabitacions(page: number = 1): Observable<PaginatedResponse<Habitacion>> {
    return this.http.get<PaginatedResponse<Habitacion>>(`${this.API_URL}/habitaciones?page=${page}`);
  }

  getHabitacion(id: number):Observable<Habitacion> {
    return this.http.get<Habitacion>(`${this.API_URL}/habitaciones/${id}`);
  }

  createHabitacion(data: Habitacion):Observable<Habitacion> {
    return this.http.post<Habitacion>(`${this.API_URL}/habitaciones`, data);
  }

  updateHabitacion(id:number,  data: Habitacion):Observable<Habitacion> {
    return this.http.put<Habitacion>(`${this.API_URL}/habitaciones/${id}`, data);
  }

  deleteHabitacion(id:number):Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/habitaciones/${id}`);
  }

  changeStatusHabitacion(id:number, activo:number):Observable<any> {
    return this.http.get<any>(`${this.API_URL}/habitaciones/${id}/estado/${activo}`);
  }
}
