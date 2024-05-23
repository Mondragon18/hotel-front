import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss'
})
export class ReservasComponent implements OnInit, AfterViewInit  {

  private readonly API_URL = 'http://127.0.0.1:8000/api';

  ngOnInit(): void {
    // this.loadHoteles();
  }

  ngAfterViewInit() {
    $('#listReservas').DataTable({
      serverSide: true,
      ajax: {
          url: `${this.API_URL}/reservas`,
          type: 'GET',
      },
      columns: [
          { data: 'habitacion_id' },
          { data: 'pasajero_id' },
          { data: 'fecha_entrada' },
          { data: 'fecha_salida' },
          { data: 'monto_total' },
          { data: 'estado' }
      ],
      processing: true, // Muestra un indicador de carga mientras se procesa la solicitu
      lengthMenu: [10, 25, 50, 100], // Opciones de cantidad de registros por página
      pageLength: 10, // Cantidad de registros mostrados por página por defecto
      searching: true, // Habilita la barra de búsqueda
      ordering: true, // Habilita el ordenamiento de columnas
      order: [[0, 'asc']], // Orden inicial por la primera columna (ascendente)
      language: { // Personalización de los textos y mensajes
          processing: 'Cargando...',
          lengthMenu: 'Mostrar _MENU_ registros por página',
          zeroRecords: 'No se encontraron registros',
          info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
          infoEmpty: 'Mostrando 0 a 0 de 0 registros',
          infoFiltered: '(filtrados de _MAX_ registros totales)',
          search: 'Buscar:',
          paginate: {
              first: 'Primero',
              last: 'Último',
              next: 'Siguiente',
              previous: 'Anterior'
          }
      },
      // Manejo de eventos
      initComplete: function () {
          console.log('Tabla inicializada');
      },
      drawCallback: function () {
          console.log('Tabla redibujada');
      }
    });
  }
}
