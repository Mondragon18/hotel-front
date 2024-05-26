import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Servicios } from 'src/app/core/models/hoteles.models';
import { Reservas } from 'src/app/core/models/reservas.models';
import { DateFormatePipe } from 'src/app/core/pipe/date-format.pipe';
import { ReservasService } from 'src/app/core/services/reservas.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, MatDialogModule, DateFormatePipe, MatChipsModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.scss'
})
export class DetalleComponent {

  reservacion?: Reservas;
  servicios?: Servicios[] = [];

  constructor(
    private reservaService:  ReservasService,
    public dialogRef: MatDialogRef<DetalleComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { reservaId: number }
  ) {}

  ngOnInit() {
    this.loadDetalle();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  private loadDetalle(): void{
    if (this.data.reservaId) {
      console.log(this.data.reservaId);
      this.reservaService.getReserva(this.data.reservaId).subscribe(resp => {
        this.reservacion = resp;
        this.servicios = resp.habitacion.hotel.servicios ?? [];

      })
    }
  }
}
