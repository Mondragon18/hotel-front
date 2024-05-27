import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habitacion, PaginatedResponse } from '../models/habitaciones.models';

import { environment } from '../../../environments/environment.prod';

const API_URL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {
  

  constructor(
    private http: HttpClient
  ) { }

  getHabitacions(page: number = 1): Observable<PaginatedResponse<Habitacion>> {
    return this.http.get<PaginatedResponse<Habitacion>>(`${API_URL}/habitaciones?page=${page}`);
  }

  getHabitacion(id: number):Observable<Habitacion> {
    return this.http.get<Habitacion>(`${API_URL}/habitaciones/${id}`);
  }

  getHabitacionOrHotel(id: number, page: number = 1, limit:number, url?:string): Observable<PaginatedResponse<Habitacion>> {
    return this.http.get<PaginatedResponse<Habitacion>>(`${API_URL}/hoteles/${id}/habitaciones?page=${page}&limit=${limit}${url ? url : ''}`);
  }


  createHabitacion(data: Habitacion):Observable<Habitacion> {
    return this.http.post<Habitacion>(`${API_URL}/habitaciones`, data);
  }

  updateHabitacion(id:number,  data: Habitacion):Observable<Habitacion> {
    return this.http.put<Habitacion>(`${API_URL}/habitaciones/${id}`, data);
  }

  deleteHabitacion(id:number):Observable<any> {
    return this.http.delete<any>(`${API_URL}/habitaciones/${id}`);
  }

  changeStatusHabitacion(id:number, activo:number):Observable<any> {
    return this.http.get<any>(`${API_URL}/habitaciones/${id}/estado/${activo}`);
  }
}
