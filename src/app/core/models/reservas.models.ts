export interface Usuarios{
  id: string;
  habitacion_id: string; 
  fecha_entrada: string;
  fecha_salida: string;
  monto_total: string;
  estado: string;
  created_at?: string;
  updated_at?: string;
}