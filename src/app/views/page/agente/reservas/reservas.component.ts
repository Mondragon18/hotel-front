import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReservasService } from 'src/app/core/services/reservas.service';
import { Reservas } from 'src/app/core/models/reservas.models';
import * as Toastify from 'toastify-js';
import { DetalleComponent } from './detalle/detalle.component';
import { MatDialog } from '@angular/material/dialog';
import { DateFormatePipe } from 'src/app/core/pipe/date-format.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss',
  standalone: true,
  imports: [CommonModule, DateFormatePipe, FormsModule ],
})
export class ReservasComponent implements OnInit  {

  reservas: Reservas[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  perPage: number = 10;
  totalItems: number = 0;
  pageNumbers: number[] = [];

  checkinDate: string = ''; // Inicializa la propiedad checkinDate
  checkoutDate: string = ''; // Inicializa la propiedad checkoutDate
  selectedHotelState: string = ''; // Inicializa la propiedad selectedHotelState
  searchName: string = ''; // Inicializa la propiedad searchName

  url: string = '';
  page: number = 1;
  limit:number = 10;
  orderBy: string = 'created_at';
  ascending:string = 'asc';

  constructor(
    private reservaService:  ReservasService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.loadResevas();
  }

  private loadResevas(url?: string): void {
    this.reservaService.getReservas(this.page, this.limit, this.orderBy, this.ascending, url).subscribe(response => {
      this.reservas = response.data;
      this.currentPage = response.current_page;
      this.totalPages = response.last_page;
      this.perPage = response.per_page;
      this.totalItems = response.total;
      this.updatePageNumbers();
    })
  }

  searchReservas(): void {
    this.url = '';
  
    if (this.searchName) {
      this.url += `&query=${this.searchName}`;
    }
    if (this.checkinDate) {
      this.url += (this.url ? '&' : '') + `&fecha_entrada=${this.checkinDate}`;
    }
    if (this.checkoutDate) {
      this.url += (this.url ? '&' : '') + `&fecha_salida=${this.checkoutDate}`;
    }
    if (this.selectedHotelState) {
      this.url += (this.url ? '&' : '') + `&estado=${this.selectedHotelState}`;
    }

    this.loadResevas(this.url);
  }

  limitReservas(limit: number):void {
    this.limit = limit;
    this.loadResevas();
  }

  ascendingReservas(orden: string):void {
    this.ascending = orden;
    this.loadResevas();
  }

  sortReservas(column: string):void {
    // Si la columna actual es la misma que la columna anterior, cambia la dirección del orden
    if (this.orderBy === column) {
      this.ascending = this.ascending === 'asc' ? 'desc' : 'asc';
    } else {
      this.orderBy = column; // Establece la nueva columna para ordenar
      this.ascending = 'asc'; // Restablece la dirección del orden a ascendente por defecto
    }
  
    this.loadResevas();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.loadResevas();
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

  openModal(reservasId?:number): void {
    const dialogRef = this.dialog.open(DetalleComponent, {
      width: '60%', // Ajusta el ancho del modal
      height: 'auto', // Ajusta la altura del modal
      data: { reservaId: reservasId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadResevas();
    });
  }

}
