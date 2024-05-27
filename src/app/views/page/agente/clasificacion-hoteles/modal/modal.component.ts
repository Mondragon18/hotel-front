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
import * as Toastify from 'toastify-js';

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
  habitacionId!: number;
  showContactoEmergencia: boolean = false;
  registroEncontrado: any = [];

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

  contactoForm: FormGroup = this.fb.group({
    nombres: [''],
    reserva_id: [''],
    telefono: ['']
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
    this.registroEncontrado = [];
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

  guardarReserva(): void {
    // Encontrar el primer registro con el ID buscado
    this.registroEncontrado = this.habitaciones.find(registro => registro.id === this.habitacionId);
    const data = {
      habitacion_id: this.habitacionId,
      pasajero_id: 1,
      fecha_entrada: this.reservaForm.get('fecha_entrada')?.value,
      fecha_salida: this.reservaForm.get('fecha_salida')?.value,
      usuario_email: 'ale@gmail.com',
      monto_total: this.registroEncontrado?.costo_base,
      estado: 'pendiente'

    };
    console.log(data);
    this.clasificacionHotelesService.createHotel(data).subscribe(response => {
      this.showSuccessToast('¡Reserva creada con exito!');
      if(response.id) {
        const dataContacto = {
          reserva_id: response.id,
          nombres: this.contactoForm.get('nombre')?.value,
          telefono: this.contactoForm.get('telefono')?.value
        };
        this.contactoForm.get('reserva_id')?.setValue(response.id);
      }
      // console.log('crear hpotel: ', response);
    });
  }

  guardarcontactoEmrgencia(): void {
    this.clasificacionHotelesService.crearContactoEmergencia(this.contactoForm.value).subscribe(response => {
      this.showSuccessToast('¡Se asigno este como contacto de emergencia a esta rserva!');

    });
    console.log(this.contactoForm.value);
  }

  private loadHabitaciones(hotel_id: number, page: number, search?: string): void {
    const query = `page=${page}&query=${search}`;
    this.clasificacionHotelesService.getHabitacionOrHotel(hotel_id, query).subscribe(response => {
      this.habitaciones = response.data;
      this.currentPage = response.current_page;
      this.totalPages = response.last_page;
      this.perPage = response.per_page;
      this.totalItems = response.total;
    });
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
