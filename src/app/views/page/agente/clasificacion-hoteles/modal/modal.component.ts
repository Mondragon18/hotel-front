import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  habitaciones: Habitacion[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  perPage: number = 10;
  totalItems: number = 0;
  pageNumbers: number[] = [];
  showForm: boolean = false;
  reservaForm!: FormGroup;

  constructor(
    private clasificacionHotelesService: ClasificacionHotelesService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { hotelId: number; filtros: any },
    private fb: FormBuilder
  ) {}

  searchForm: FormGroup = this.fb.group({
    search: [''],
  });

  hasError(field: string): boolean {
    const errorsObjetc = this.searchForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObjetc);

    if (errors.length && (this.searchForm.get(field)?.touched || this.searchForm.get(field)?.dirty)) {
      return true;
    }
    return false;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.reservaForm = this.fb.group({
      fecha_entrada: [this.data.filtros.fecha_entrada],
      fecha_salida: [this.data.filtros.fecha_salida],
      // Agrega aquí otros campos que necesites
    });
    this.loadDataIntoForm();
    this.watchSearchField();
  }

  watchSearchField(): void {
    this.searchForm.get('search')?.valueChanges.subscribe(value => {
      console.log('El valor del campo de búsqueda ha cambiado:', value);
      this.loadHabitaciones(this.data.hotelId, 1, value);
    });
  }

  private loadDataIntoForm(): void {
    this.loadHabitaciones(this.data.hotelId, 1, '');
  }

  private guardarReserva(): void {
    const data = {
      id_habitacion: '',
      id_hote: '',
      fecha_entrada: this.reservaForm.get('fecha_entrada'),
      fecha_salida: this.reservaForm.get('fecha_salida')
    };
    // this.clasificacionHotelesService.getHabitacionOrHotel(data).subscribe(response => {

    // }
  }

  private loadHabitaciones(hotel_id: number, page: number, search?: string): void {
    const query = `page=${page}&query=${search}`;
    this.clasificacionHotelesService.getHabitacionOrHotel(hotel_id, query).subscribe(response => {
      this.habitaciones = response.data;
      this.currentPage = response.current_page;
      this.totalPages = response.last_page;
      this.perPage = response.per_page;
      this.totalItems = response.total;
      // console.log('habitaciones: ', response);
    });
  }
}
