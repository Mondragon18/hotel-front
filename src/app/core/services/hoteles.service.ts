import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel, PaginatedResponse } from '../models/hoteles.models';

import { environment } from 'src/environments/environment';

const API_URL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class HotelesService {

  constructor(
    private http: HttpClient
  ) { }

  getHotels(page: number = 1): Observable<PaginatedResponse<Hotel>> {
    return this.http.get<PaginatedResponse<Hotel>>(`${API_URL}/hoteles?page=${page}`);
  }

  getHotel(id: number):Observable<Hotel> {
    return this.http.get<Hotel>(`${API_URL}/hoteles/${id}`);
  }

  createHotel(data: Hotel):Observable<Hotel> {
    return this.http.post<Hotel>(`${API_URL}/hoteles`, data);
  }

  updateHotel(id:number,  data: Hotel):Observable<Hotel> {
    return this.http.put<Hotel>(`${API_URL}/hoteles/${id}`, data);
  }

  deleteHotel(id:number):Observable<any> {
    return this.http.delete<any>(`${API_URL}/hoteles/${id}`);
  }

  changeStatusHotel(id:number, activo:number):Observable<any> {
    return this.http.get<any>(`$PI_URL}/hoteles/${id}/estado/${activo}`);
  }
}
