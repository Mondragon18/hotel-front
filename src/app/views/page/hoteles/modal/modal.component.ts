import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { HabitacionesService } from 'src/app/core/services/habitaciones.service';
import * as Toastify from 'toastify-js';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {

  habitacionForm: FormGroup = new FormGroup({
    hotel_id: new FormControl(this.data.hotelId, [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    descripcion: new FormControl(''),
    costo_base: new FormControl('', [ Validators.required, Validators.pattern(/^[0-9]+$/), ]),
    impuestos: new FormControl('', [ Validators.required, Validators.pattern(/^[0-9]+$/),]),
    activo: new FormControl(false, [Validators.required]),
  });

  constructor(
    private habitacionesService: HabitacionesService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { hotelId: number; habitacionId?: number }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data.hotelId); // Aquí puedes utilizar el ID del hotel
    console.log(this.data.habitacionId); // Aquí puedes utilizar el ID del habitacionId
  }

  saveHabitacion(): void {
    if (this.data.habitacionId){
      this.habitacionesService.updateHabitacion(this.data.habitacionId, this.habitacionForm.value).subscribe(hotel => {
        this.showSuccessToast("Habitacion actualizado con éxito");
        this.onClose();
      }) 
    } else {
      this.habitacionesService.createHabitacion(this.habitacionForm.value).subscribe(hotel => {
        this.showSuccessToast("Habitacion agregado con éxito");
        this.onClose();
      })
    }
  }

  hasError(field: string): boolean {
    const errorsObjetc = this.habitacionForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObjetc);

    if(errors.length && (this.habitacionForm.get(field)?.touched || this.habitacionForm.get(field)?.dirty)){
      return true;
    }

    return false;
  }

  getCurrentError(field: string): string {
    const errorsObjetc = this.habitacionForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObjetc);

    if(!errors)
        return '';
      
    return errors[0];
  }

  getFormTitle(): string {
    return this.data.habitacionId ? 'Editar habitación' : 'Registrar habitación';
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
