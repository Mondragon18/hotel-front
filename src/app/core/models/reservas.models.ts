import { ContactoEmergencia } from './contacto.emergencia.models';
import { Habitacion } from './habitaciones.models';
import { Pasajeros } from './pasajeros.models';

export interface Reservas{
  id: number;
  habitacion_id: number;
  pasajero_id: number;
  fecha_entrada: string;
  fecha_salida: string;
  created_at: string;
  estado: string;
  monto_total: string;
  habitacion: Habitacion;
  pasajero: Pasajeros;
  contacto_emergencia?: ContactoEmergencia;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

