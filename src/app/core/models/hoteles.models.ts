// Definición de la interfaz para una habitación
export interface Habitacion {
  id: number;
  hotel_id: number;
  tipo: string;
  descripcion : string;
  costo_base: string;
  impuestos: string;
  activo: number;
  created_at: string;
  updated_at: string;
} 
export interface Hotel {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  provincia_estado: string;
  pais: string;
  telefono: string;
  email: string;
  clasificacion: string;
  servicios?: Servicios[];
  descripcion?: string;
  fecha_apertura?: string;
  pagina_web?: string;
  imagenes?: string[];
  activo: number;
  habitaciones_count?: number;
  habitaciones?: Habitacion[]; // Array de habitaciones
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
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

export interface Servicios {
  id: number;
  nombre: string;
}