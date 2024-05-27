import { Injectable } from '@angular/core';
import { Pasajeros } from '../models/pasajeros.models';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private readonly API_URL = environment.base_url;

  constructor(
    private http: HttpClient
  ) { }

  crearPasajero(data: any): Observable<Pasajeros> {
    return this.http.post<Pasajeros>(`${this.API_URL}/pasajero`, data);
  }
}
