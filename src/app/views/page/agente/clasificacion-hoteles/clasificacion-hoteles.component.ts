import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Hotel } from 'src/app/core/models/clasificacion-hoteles.model';
import { ClasificacionHotelesService } from 'src/app/core/services/clasificacion-hoteles.service';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-clasificacion-hoteles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clasificacion-hoteles.component.html',
  styleUrls: ['./clasificacion-hoteles.component.scss']
})
export class ClasificacionHotelesComponent implements OnInit {

  hoteles: Hotel[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  perPage: number = 10;
  totalItems: number = 0;
  pageNumbers: number[] = [];
  ciudades: string[] = ['Bogotá','Medellín','Cali','Barranquilla','Cartagena','Cúcuta','Bucaramanga','Pereira','Santa Marta','Ibagué','Manizales','Villavicencio','Pasto','Montería','Armenia','Neiva','Popayán','Sincelejo','Valledupar','Tunja'];

  hotelForm: FormGroup = new FormGroup({
    search: new FormControl(''),
    fecha_entrada: new FormControl(''),
    fecha_salida: new FormControl(''),
    huespedes: new FormControl(''),
    ciudad: new FormControl('')
  });

  constructor(
    private clasificacionHotelesService: ClasificacionHotelesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadHoteles();
    this.watchFormFields();
  }

    watchFormFields(): void {
      this.hotelForm.valueChanges.subscribe(values => {
        console.log('Los valores del formulario han cambiado:', values);
        console.log('Llamando a loadHoteles con los siguientes parámetros:', {
          page: 1,
          search: values.search,
          fecha_entrada: values.fecha_entrada,
          fecha_salida: values.fecha_salida,
          huespedes: values.huespedes,
          ciudad: values.ciudad
        });
        this.loadHoteles(1, values.search, values.fecha_entrada, values.fecha_salida, values.huespedes, values.ciudad);
      });
    }

  hasError(field: string): boolean {
    const control = this.hotelForm.get(field);
    return control?.invalid && (control.touched || control.dirty) || false;
  }

  private loadHoteles(page: number = 1, search: string = '', fecha_entrada: string = '', fecha_salida: string = '', huespedes: string = '', ciudad: string = ''): void {
    const query = `page=${page}&query=${search}&fecha_entrada=${fecha_entrada}&fecha_salida=${fecha_salida}&huespedes=${huespedes}&ciudad=${ciudad}`;
    this.clasificacionHotelesService.getHotels(query).subscribe(response => {
      this.hoteles = response.data;
      this.currentPage = response.current_page;
      this.totalPages = response.last_page;
      this.perPage = response.per_page;
      this.totalItems = response.total;
      this.updatePageNumbers();
    });
  }

  openModal(habitacionId?: number): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50%',
      height: 'auto',
      data: { hotelId: habitacionId }
    });

    dialogRef.afterOpened().subscribe(() => {
      if (habitacionId) {
        this.loadHabitaciones(habitacionId);
      } else {
        alert('¡No se pudo identificar este hotel!');
      }
    });
  }

  private loadHabitaciones(habitacionId: number): void {
    // Aquí puedes definir la lógica para cargar habitaciones basadas en habitacionId
  }

  getCurrentError(field: string): string {
    const errorsObject = this.hotelForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObject);
    return errors.length ? errors[0] : '';
  }

  updatePageNumbers(): void {
    const pageCount = 5;
    const startPage = Math.max(this.currentPage - Math.floor(pageCount / 2), 1);
    const endPage = Math.min(startPage + pageCount - 1, this.totalPages);

    this.pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      this.pageNumbers.push(i);
    }
  }
}
