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
import { ClasificacionHotelesService } from 'src/app/core/services/clasificacion-hoteles.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {

  constructor(
    private ClasificacionHotelesService:  ClasificacionHotelesService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { hotelId: number; habitacionId?: number }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit () {
    this.loadDataIntoForm();
  }

  private loadDataIntoForm () : void {
    this.loadhabitaciones(this.data.hotelId);
  }

  private loadhabitaciones (habitacionId: number) {
    this.ClasificacionHotelesService.getHabitacions(habitacionId).subscribe(response => {
      console.log('habitaciones: ', response);
    });
  }
}
