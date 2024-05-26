import { Hotel } from './hoteles.models';

export interface Habitacion {
  id: number;
  hotel_id: number;
  hotel: Hotel;
  tipo: string;
  numero_persona: number;
  descripcion : string;
  costo_base: number;
  impuestos: number;
  activo: boolean;
  total: number;
  created_at: string;
  updated_at: string;
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
