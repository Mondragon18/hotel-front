import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Hotel, Servicios } from 'src/app/core/models/hoteles.models';
import { HotelesService } from 'src/app/core/services/hoteles.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import * as Toastify from 'toastify-js';
import { HabitacionesService } from 'src/app/core/services/habitaciones.service';
import { MatChipsModule } from '@angular/material/chips';
import { DateFormatePipe } from 'src/app/core/pipe/date-format.pipe';
import { Habitacion } from 'src/app/core/models/habitaciones.models';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalComponent, MatChipsModule, DateFormatePipe, FormsModule, MatMenuModule],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.scss'
})
export class HabitacionesComponent implements OnInit  {

  hotelId?: number;
  hotel?: Hotel;
  habitacion: Habitacion[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  perPage: number = 10;
  totalItems: number = 0;
  pageNumbers: number[] = [];

  servicios: Servicios[] = [];

  url: string = ''; // Resto de la url para filtrar
  page: number = 1; // Numero de pagina
  limit:number = 10; // Limite de paginación
  paginationLimits: number[] = [1, 5, 10, 20, 50, 100]; // Opciones de límite de paginación

  selectedHabitacionState: string = ''; // Inicializa la propiedad selectedHotelState
  searchName: string = ''; // Inicializa la propiedad searchName

  constructor(
    private hotelesService: HotelesService,
    private habitacionesService: HabitacionesService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getHotel();
    this.getHabitaciones();
  }

  private getHotel(): void {
    this.hotelId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.hotelId) {
      this.hotelesService.getHotel(this.hotelId).subscribe(response => {
        this.hotel = response;
        this.servicios = response.servicios ?? [];
        console.log(response); // Esto es opcional, puedes eliminarlo si no lo necesitas
      });
    }
  }

  private getHabitaciones(url?: string): void {
    this.hotelId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.hotelId) {
      this.habitacionesService.getHabitacionOrHotel(this.hotelId, this.page, this.limit, url).subscribe(response => {
        this.habitacion = response.data;
        this.currentPage = response.current_page;
        this.totalPages = response.last_page;
        this.perPage = response.per_page;
        this.totalItems = response.total;
        this.updatePageNumbers();
      });
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.getHabitaciones();
    }
  }

  updatePageNumbers(): void {
    const pageCount = 5; // Number of page links to show
    const startPage = Math.max(this.currentPage - Math.floor(pageCount / 2), 1);
    const endPage = Math.min(startPage + pageCount - 1, this.totalPages);

    this.pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      this.pageNumbers.push(i);
    }
  }

  searchHabitacion(): void {
    this.url = '';
  
    if (this.searchName) {
      this.url += `&query=${this.searchName}`;
    }
    if (this.selectedHabitacionState) {
      this.url += (this.url ? '&' : '') + `&estado=${this.selectedHabitacionState}`;
    }

    this.getHabitaciones(this.url);
  }


  limitHabitacion():void {
    this.getHabitaciones();
  }

  openModal(habitacionId?:number): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50%', // Ajusta el ancho del modal
      height: 'auto', // Ajusta la altura del modal
      data: { hotelId: this.hotelId, habitacionId: habitacionId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getHotel();
      // Aquí puedes manejar lo que quieras hacer después de que se cierre el modal
    });
  }

  deleteHabitacion(id: number): void {
    this.habitacionesService.deleteHabitacion(id).subscribe(hotel => {
      this.showSuccessToast("Habitacion eliminado con éxito");
      this.getHotel();
    })
  }

  statusHabitacion(id: number, status: boolean): void {
    const statusnew = (status) ? 0 : 1;
    this.habitacionesService.changeStatusHabitacion(id, statusnew).subscribe(habitacion => {
      this.showSuccessToast((status) ? 'Habitacion activo con éxito' : 'Habitacion desactivado con éxito');
      this.getHotel();
    })
  }

  private showSuccessToast(message: string): void {
    Toastify({
      text: message,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus : true,
      style: {
        background: "#189586",
      }
    }).showToast();
  }
}
