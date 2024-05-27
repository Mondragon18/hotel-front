import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ClasificacionHotelesService } from 'src/app/core/services/clasificacion-hoteles.service';
import { Habitacion } from 'src/app/core/models/habitaciones.models';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {

  habitaciones: Habitacion[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  perPage: number = 10;
  totalItems: number = 0;
  pageNumbers: number[] = [];

  constructor(
    private ClasificacionHotelesService:  ClasificacionHotelesService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { hotelId: number; habitacionId?: number }
  ) {}

  hotelForm: FormGroup = new FormGroup({
    search : new FormControl(''),
  })


  hasError(field: string): boolean {
    const errorsObjetc = this.hotelForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObjetc);

    if(errors.length && (this.hotelForm.get(field)?.touched || this.hotelForm.get(field)?.dirty)){
      return true;
    }
    return false;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.loadDataIntoForm();
    this.watchSearchField();
  }

  watchSearchField(): void {
    this.hotelForm.get('search')?.valueChanges.subscribe(value => {
      console.log('El valor del campo de búsqueda ha cambiado:', value);
      this.loadhabitaciones(1, value);
    });
  }

  private loadDataIntoForm () : void {
    this.loadhabitaciones(this.data.hotelId, '');
  }

  private loadhabitaciones (page: number = 1, search?: String) {
    const query = `page=${page}&search=${search}`;
    this.ClasificacionHotelesService.getHabitacions(query).subscribe(response => {
      this.habitaciones = response.data;
      this.currentPage = response.current_page;
      this.totalPages = response.last_page;
      this.perPage = response.per_page;
      this.totalItems = response.total;
      console.log('habitaciones: ', response);
    });
  }
}
