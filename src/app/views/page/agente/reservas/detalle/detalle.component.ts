import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DateFormatePipe } from 'src/app/core/pipe/date-format.pipe';
import { ReservasService } from 'src/app/core/services/reservas.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, MatDialogModule, DateFormatePipe],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.scss'
})
export class DetalleComponent {

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
        console.log(resp)
      })
    }
  }
}
