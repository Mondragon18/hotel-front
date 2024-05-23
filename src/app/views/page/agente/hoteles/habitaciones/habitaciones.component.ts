import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Habitacion, Hotel, Servicios } from 'src/app/core/models/hoteles.models';
import { HotelesService } from 'src/app/core/services/hoteles.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import * as Toastify from 'toastify-js';
import { HabitacionesService } from 'src/app/core/services/habitaciones.service';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalComponent, MatChipsModule],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.scss'
})
export class HabitacionesComponent implements OnInit  {

  hotelId?: number;
  hotel?: Hotel;
  habitacion: Habitacion[] = [];
  servicios: Servicios[] = [];

  constructor(
    private hotelesService: HotelesService,
    private habitacionesService: HabitacionesService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getHotel();
  }

  private getHotel(): void {
    this.hotelId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.hotelId) {
      this.hotelesService.getHotel(this.hotelId).subscribe(response => {
        this.hotel = response;
        this.habitacion = response.habitaciones ?? [];
        this.servicios = response.servicios ?? [];
        console.log(response); // Esto es opcional, puedes eliminarlo si no lo necesitas
      });
    }
  }

  openModal(habitacionId?:number): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50%', // Ajusta el ancho del modal
      height: 'auto', // Ajusta la altura del modal
      data: { hotelId: this.hotelId, habitacionId: habitacionId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getHotel();
      // Aquí puedes manejar lo que quieras hacer después de que se cierre el modal
    });
  }

  deleteHabitacion(id: number): void {
    this.habitacionesService.deleteHabitacion(id).subscribe(hotel => {
      this.showSuccessToast("Habitacion eliminado con éxito");
      this.getHotel();
    })
  }

  statusHotel(id: number, status: number): void {
    status = (status == 1) ? 0 : 1;

    this.habitacionesService.changeStatusHabitacion(id, status).subscribe(habitacion => {
      this.showSuccessToast((status == 1) ? 'Habitacion activo con éxito' : 'Habitacion desactivado con éxito');
      this.getHotel();
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
        background: "#189586",
      }
    }).showToast();
  }
}
