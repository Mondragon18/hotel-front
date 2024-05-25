
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Hotel } from 'src/app/core/models/clasificacion-hoteles.model';
import { ClasificacionHotelesService } from 'src/app/core/services/clasificacion-hoteles.service';
import { ModalComponent } from './modal/modal.component';


@Component({
  selector: 'app-clasificacion-hoteles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clasificacion-hoteles.component.html',
  styleUrl: './clasificacion-hoteles.component.scss'
})
export class ClasificacionHotelesComponent implements OnInit {

  hoteles: Hotel[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  perPage: number = 10;
  totalItems: number = 0;
  pageNumbers: number[] = [];


  constructor(
    private ClasificacionHotelesService:  ClasificacionHotelesService,
    public dialog: MatDialog
  ){}

  hotelForm: FormGroup = new FormGroup({
    search : new FormControl(''),
    fecha_entrada: new FormControl(''),
    fecha_salida: new FormControl(''),
    huespedes: new FormControl(''),
    ciudad: new FormControl(''),
  })


  hasError(field: string): boolean {
    const errorsObjetc = this.hotelForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObjetc);

    if(errors.length && (this.hotelForm.get(field)?.touched || this.hotelForm.get(field)?.dirty)){
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    this.loadHoteles();
  }

  openModal(habitacionId?:number): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50%', // Ajusta el ancho del modal
      height: 'auto', // Ajusta la altura del modal
      data: { hotelId: habitacionId}
    });

    // dialogRef.afterOpened().subscribe(() => {
    //   // Aquí puedes ejecutar la función que desees al abrir el modal
    //   // Por ejemplo, llamar a una función específica
    //   if(habitacionId) {
    //     this.loadhabitaciones(habitacionId);
    //   } else {
    //     alert('¡No se pudo identificar este hotel!');
    //   }
    // });
  }

  getCurrentError(field: string): string {
    const errorsObjetc = this.hotelForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObjetc);

    if(!errors)
        return '';

    return errors[0];
  }

  private loadHoteles(page: number = 1): void {
    this.ClasificacionHotelesService.getHotels(page).subscribe(response => {
      this.hoteles = response.data;
      this.currentPage = response.current_page;
      this.totalPages = response.last_page;
      this.perPage = response.per_page;
      this.totalItems = response.total;
      this.updatePageNumbers();
    })
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
}
