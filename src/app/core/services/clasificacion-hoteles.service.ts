import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../models/hoteles.models';
import { Hotel } from '../models/clasificacion-hoteles.model';
import { Habitacion } from '../models/habitaciones.models';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionHotelesService {

  private readonly API_URL = 'http://127.0.0.1:8000/api';
  constructor(
    private http: HttpClient
  ) { }

  getHotels(query: String = 'page=1'): Observable<PaginatedResponse<Hotel>> {
    return this.http.get<PaginatedResponse<Hotel>>(`${this.API_URL}/hoteles?${query}`);
  }

  getHabitacions(query: String ='page=1'): Observable<PaginatedResponse<Habitacion>> {
    return this.http.get<PaginatedResponse<Habitacion>>(`${this.API_URL}/habitaciones?${query}`);
  }
}
