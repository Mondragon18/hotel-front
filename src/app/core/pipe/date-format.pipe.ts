import { Pipe, PipeTransform } from '@angular/core';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { es } from 'date-fns/locale/es';

@Pipe({
  name: 'dateFormate',
  standalone: true,
})
export class DateFormatePipe implements PipeTransform {
  transform(value: string, formato: string): string {
    const fecha = new Date(value);
    const fechaUTC = new Date(fecha.getTime() + fecha.getTimezoneOffset() * 60 * 1000);
    switch (formato) {
      case 'humano':
        return format(fechaUTC, "d 'de' MMMM, yyyy");
      case 'humanizacion': 
        return formatDistanceToNowStrict(fechaUTC, { addSuffix: true, locale: es, roundingMethod: 'floor' }); 
      case 'corta':
        return format(fechaUTC, "dd/MM/yyyy");
      case 'larga':
        return format(fechaUTC, "EEEE, d 'de' MMMM 'de' yyyy");
      default:
        return format(fechaUTC, formato);
    }
  }
}