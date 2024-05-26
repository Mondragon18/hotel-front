import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Hotel } from 'src/app/core/models/hoteles.models';
import { HotelesService } from 'src/app/core/services/hoteles.service';
import * as Toastify from 'toastify-js';

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrl: './hoteles.component.scss'
})
export class HotelesComponent  implements OnInit {

  hoteles: Hotel[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  perPage: number = 10;
  totalItems: number = 0;
  pageNumbers: number[] = [];

  url: string = ''; // Resto de la url para filtrar
  page: number = 1; // Numero de pagina
  limit:number = 10; // Limite de paginación
  orderBy:string = 'asc'; // Limite de paginación
  paginationLimits: number[] = [1, 5, 10, 20, 50, 100]; // Opciones de límite de paginación
  paginationOrderby: string[] = ['asc', 'desc']; // Opciones de límite de paginación
  
  clasificacionHotel: string = ''; // Inicializa la propiedad checkoutDate
  paginationClasificacion: number[] = [0, 1, 2, 3, 4, 5]; // Opciones de límite de paginación
  selectedHotelState: string = ''; // Inicializa la propiedad selectedHotelState
  searchName: string = ''; // Inicializa la propiedad searchName

  constructor(
    private hotelesService:  HotelesService,
    public dialog: MatDialog  
  ){}

  ngOnInit(): void {
    this.loadHoteles();
  }

  private loadHoteles(url?: string): void {
    this.hotelesService.getHotels(this.page, this.limit, this.orderBy, url).subscribe(response => {
      this.hoteles = response.data;
      this.currentPage = response.current_page;
      this.totalPages = response.last_page;
      this.perPage = response.per_page;
      this.totalItems = response.total;
      this.updatePageNumbers();
    })
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.loadHoteles();
    }
  }

  searchHoteles(): void {
    this.url = '';
  
    if (this.searchName) {
      this.url += `&query=${this.searchName}`;
    }
    if (this.clasificacionHotel) {
      this.url += (this.url ? '&' : '') + `&clasificacion=${this.clasificacionHotel}`;
    }
    if (this.selectedHotelState) {
      this.url += (this.url ? '&' : '') + `&estado=${this.selectedHotelState}`;
    }

    this.loadHoteles(this.url);
  }

  
  limitHoteles():void {
    this.loadHoteles();
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

  deleteHotel(id: number): void {
    this.hotelesService.deleteHotel(id).subscribe(hotel => {
      this.showSuccessToast("Hotel eliminado con éxito");
      this.loadHoteles();
    })
  }

  statusHotel(id: number, status: number): void {
    status = (status == 1) ? 0 : 1;

    this.hotelesService.changeStatusHotel(id, status).subscribe(hotel => {
      this.showSuccessToast((status == 1) ? 'Hotel activado con éxito' : 'Hotel inactivado con éxito');
      this.loadHoteles();
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
        background: "#21998b",
      }
    }).showToast();
  }
}
