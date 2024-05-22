import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicios } from '../models/servicios.models';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private readonly API_URL = 'http://127.0.0.1:8000/api';
  constructor(
    private http: HttpClient
  ) { }

  getServicios(): Observable<Servicios[]> {
    return this.http.get<Servicios[]>(`${this.API_URL}/servicios`);
  }

}
