import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../models/hoteles.models';
import { Hotel } from '../models/clasificacion-hoteles.model';
import { Habitacion } from '../models/habitaciones.models';
import { ContactoEmergencia } from '../models/contacto.emergencia.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionHotelesService {

  private readonly API_URL = environment.base_url;
  constructor(
    private http: HttpClient
  ) { }

  getHotels(query: String = 'page=1'): Observable<PaginatedResponse<Hotel>> {
    return this.http.get<PaginatedResponse<Hotel>>(`${this.API_URL}/hoteles?${query}`);
  }

  getHabitacions(query: String ='page=1'): Observable<PaginatedResponse<Habitacion>> {
    return this.http.get<PaginatedResponse<Habitacion>>(`${this.API_URL}/habitaciones?${query}`);
  }

  getHabitacionOrHotel(id_hotel: number , query: String ='page=1'): Observable<PaginatedResponse<Habitacion>> {
    return this.http.get<PaginatedResponse<Habitacion>>(`${this.API_URL}/hoteles/${id_hotel}/habitaciones?${query}`);
  }

  createHotel(data: any):Observable<Hotel> {
    return this.http.post<Hotel>(`${this.API_URL}/reservas`, data);
  }
  crearContactoEmergencia(data: any): Observable<ContactoEmergencia> {
    return this.http.post<ContactoEmergencia>(`${this.API_URL}/conatcto_emergencia`, data);
  }
}
