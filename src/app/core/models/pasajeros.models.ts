import { Usuarios } from './usuarios.models';

export interface Pasajeros{
  id: number;
  user_id: number;
  user: Usuarios;
  fecha_nacimiento: string;
  genero: string;
  tipo_documento?: string;
  numero_documento?: string;
  telefono?: string;
  created_at?: string;
  updated_at?: string;
}