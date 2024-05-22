import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel, PaginatedResponse } from '../models/hoteles.models';

@Injectable({
  providedIn: 'root'
})
export class HotelesService {

  private readonly API_URL = 'http://127.0.0.1:8000/api';
  constructor(
    private http: HttpClient
  ) { }

  getHotels(page: number = 1): Observable<PaginatedResponse<Hotel>> {
    return this.http.get<PaginatedResponse<Hotel>>(`${this.API_URL}/hoteles?page=${page}`);
  }

  getHotel(id: number):Observable<Hotel> {
    return this.http.get<Hotel>(`${this.API_URL}/hoteles/${id}`);
  } 

  createHotel(data: Hotel):Observable<Hotel> {
    return this.http.post<Hotel>(`${this.API_URL}/hoteles`, data);
  } 

  updateHotel(id:number,  data: Hotel):Observable<Hotel> {
    return this.http.put<Hotel>(`${this.API_URL}/hoteles/${id}`, data);
  } 

  deleteHotel(id:number):Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/hoteles/${id}`);
  } 
}
