import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicios } from '../models/servicios.models';

import { environment } from 'src/environments/environment';

const API_URL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(
    private http: HttpClient
  ) { }

  getServicios(): Observable<Servicios[]> {
    return this.http.get<Servicios[]>(`${API_URL}/servicios`);
  }

}
