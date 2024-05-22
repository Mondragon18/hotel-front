import { Component, OnInit } from '@angular/core';
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

  constructor(
    private hotelesService:  HotelesService
  ){}

  ngOnInit(): void {
    this.loadHoteles();
  }

  private loadHoteles(page: number = 1): void {
    this.hotelesService.getHotels(page).subscribe(response => {
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
      this.loadHoteles(page);
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

  deleteHotel(id: number): void {
    this.hotelesService.deleteHotel(id).subscribe(hotel => {
      this.showSuccessToast("Hotel eliminado con éxito");
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
