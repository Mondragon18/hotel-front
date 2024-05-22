export interface Pasajeros{
  id: string;
  user_id: string; 
  reserva_id: string;
  fecha_nacimiento: string;
  email: string;
  genero: string;
  tipo_documento: string;
  numero_documento: string;
  telefono: string;
  created_at?: string;
  updated_at?: string;
}