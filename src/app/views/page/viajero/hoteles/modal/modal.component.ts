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
import { TokenService } from 'src/app/core/services/token.service';
import { PersonaService } from '../../../../../core/services/persona.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  
  errors: any; 
  usuario: any;
  persona: any;

  habitaciones: Habitacion[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  perPage: number = 10;
  totalItems: number = 0;
  pageNumbers: number[] = [];
  reservaForm!: FormGroup;
  habitacionId!: number;
  registroEncontrado: any = [];

  showForm: boolean = false;
  showRegistPersona: boolean = false;
  showContactoEmergencia: boolean = false;

  generoList: string[] = ['femenino', 'masculino', 'otro']; // Opciones de límite de paginación
  documentoList: string[] = ['CC', 'NIT', 'TT']; // Opciones de límite de paginación

  constructor(
    private tokenService: TokenService,
    private clasificacionHotelesService: ClasificacionHotelesService,
    private personaService: PersonaService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { hotelId: number, nombre: string, filtros: any },
    private fb: FormBuilder
  ) {}

  searchForm: FormGroup = this.fb.group({
    search: [''],
  });

  personaForm: FormGroup = this.fb.group({
    user_id : ['', Validators.required],
    fecha_nacimiento : ['', Validators.required],
    genero : [''],
    tipo_documento : ['CC', Validators.required],
    numero_documento : ['', Validators.required],
    telefono : [''],
  })

  contactoForm: FormGroup = this.fb.group({
    nombres: ['', Validators.required],
    reserva_id: ['', Validators.required],
    telefono: ['', Validators.required]
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
    this.persona = this.tokenService.getPersona();
    this.usuario = this.tokenService.getUsers();

    this.reservaForm = this.fb.group({
      fecha_entrada: [this.data.filtros.fecha_entrada, Validators.required],
      fecha_salida: [this.data.filtros.fecha_salida, Validators.required],
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
    if( this.persona.id ){
      this.cleanErros();
      // Encontrar el primer registro con el ID buscado
      this.registroEncontrado = this.habitaciones.find(registro => registro.id === this.habitacionId);
      const data = {
        habitacion_id: this.habitacionId,
        pasajero_id: this.persona.id,
        fecha_entrada: this.reservaForm.get('fecha_entrada')?.value,
        fecha_salida: this.reservaForm.get('fecha_salida')?.value,
        monto_total: this.registroEncontrado?.costo_base,
        estado: 'pendiente',
      };
      this.clasificacionHotelesService.createHotel(data).subscribe(
        response => this.handleResponse(response),      
        errors => this.handleErrors(errors)
      );
    }
  }

  guardarcontactoEmrgencia(): void {
    this.clasificacionHotelesService.crearContactoEmergencia(this.contactoForm.value).subscribe(
      response => this.handleResponseContacto(response),      
      errors => this.handleErrors(errors)
    );
  }

  guardarPersona(): void {
    // if(this.usuario.id){
      const data = {
        user_id : this.usuario.id,
        fecha_nacimiento : this.personaForm.get('fecha_nacimiento')?.value,
        genero : this.personaForm.get('genero')?.value,
        tipo_documento : this.personaForm.get('tipo_documento')?.value,
        numero_documento : this.personaForm.get('numero_documento')?.value,
        telefono : this.personaForm.get('telefono')?.value,
      }
      this.personaService.crearPasajero(data).subscribe(
        response => this.handleResponsePersona(response),      
        errors => this.handleErrors(errors)
      );
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

  private handleResponse(response: any):void {
    this.showSuccessToast('¡Reserva creada con exito!');
      if(response.id) {
        const dataContacto = {
          reserva_id: response.id,
          nombres: this.contactoForm.get('nombre')?.value,
          telefono: this.contactoForm.get('telefono')?.value
        };
        this.contactoForm.get('reserva_id')?.setValue(response.id);
        this.guardarcontactoEmrgencia(); 
      }
  }

  private handleResponseContacto(response: any):void {
    this.showSuccessToast('¡Se asigno un contacto de emergencia a esta reserva!');
    this.onClose();
  }

  private handleResponsePersona(response: any):void {
    this.tokenService.handlePersona(response);
    this.persona = response;
    this.showSuccessToast('¡Se agrego el perfil del usuario!');
    // this.showFormreserva = true;
    this.showRegistPersona = false;
  }

  private handleErrors(errors:any): void {
    this.errors = errors.error;
  }

  private cleanErros(): void {
    this.errors = null;
  }
}
