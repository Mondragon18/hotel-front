import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotelesService } from '../../../../core/services/hoteles.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, NumberSymbol } from '@angular/common';
import { ServiciosService } from 'src/app/core/services/servicios.service';
import { Servicios } from 'src/app/core/models/servicios.models';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-hoteles-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, RouterModule ],
  templateUrl: './hoteles-form.component.html',
  styleUrl: './hoteles-form.component.scss'
})
export class HotelesFormComponent implements OnInit {

  serviciosSeleccionados: { id: string, nombre: string }[] = [];
  services: Servicios[] = [];
  selectedImages: File[] = [];

  hotelForm: FormGroup = new FormGroup({
    nombre : new FormControl('', [Validators.required, Validators.maxLength(150)]),
    direccion : new FormControl('', Validators.required),
    ciudad : new FormControl('', Validators.required),
    pais : new FormControl('', Validators.required),
    telefono : new FormControl('', Validators.required),
    email : new FormControl('', Validators.required),
    clasificacion : new FormControl(''),
    servicios : new FormControl([]),
    descripcion : new FormControl(''),
    fecha_apertura : new FormControl(''),
    imagenes : new FormControl(''),
    pagina_web : new FormControl(''),
    // activo : new FormControl(''),
  })

  hotelId?: number;

  constructor(
    private hotelesService: HotelesService,
    private serviciosService: ServiciosService,
    private router: Router,
    private route: ActivatedRoute
  ){}


  ngOnInit(): void {
    this.loadServicios();
    this.loadDataIntoForm();
  }

  private loadServicios(): void {
    this.serviciosService.getServicios().subscribe(response => {
      this.services = response;
    })
  }

  // onFileSelected(event: any) {
  //   this.selectedImages = event.target.files[0];
  //   this.selectedImages = event.target.files[0];

  //   console.log(this.selectedImages.values);

  // }

  // Método para obtener la URL de una imagen seleccionada
  // getImageSrc(image: File): string {
  //   return window.URL.createObjectURL(image);
  // }

  // actualizarServicios(servicioSeleccionado: { id: string; nombre: string; }) {
  //   const servicio = this.services.find(servicio => servicio.id === servicioSeleccionado.id);
  //   if (servicio) {
  //     const servicioSeleccionadoIndex = this.serviciosSeleccionados.findIndex(servicio => servicio.id === servicioSeleccionado.id);
  //     if (servicioSeleccionadoIndex === -1) {
  //       // Si el servicio no está seleccionado, lo agregamos
  //       this.serviciosSeleccionados.push({ id: servicio.id, nombre: servicio.nombre });
  //     } else {
  //       // Si el servicio ya está seleccionado, lo eliminamos
  //       this.serviciosSeleccionados.splice(servicioSeleccionadoIndex, 1);
  //     }
  //     // Actualizamos el valor del formulario con los IDs y nombres de los servicios seleccionados
  //     this.hotelForm.get('servicios')?.setValue(this.serviciosSeleccionados);
  //   }
  // }

  actualizarServicios(servicioSeleccionado: { id: string, nombre: string }) {
    const index = this.serviciosSeleccionados.findIndex(servicio => servicio.id === servicioSeleccionado.id);

    if (index === -1) {
      this.serviciosSeleccionados.push(servicioSeleccionado);
    } else {
      this.serviciosSeleccionados.splice(index, 1);
    }

    this.hotelForm.get('servicios')?.setValue(this.serviciosSeleccionados);

    console.log(this.hotelForm.value);
  }

  saveHotel(): void {
    const serviciosJSON = JSON.stringify(this.hotelForm.get('servicios')?.value);

    // Crear un nuevo objeto para enviar al servidor, copiando los otros campos del formulario
    const datosFormulario = { ...this.hotelForm.value, servicios: serviciosJSON };
    console.log(datosFormulario);
    // if (this.selectedImages) {
    //   this.hotelForm.patchValue({ imagenes: this.selectedImages });
    // }

    if (this.hotelId){
      this.hotelesService.updateHotel(this.hotelId, datosFormulario).subscribe(hotel => {
        this.router.navigateByUrl('/hoteles');
      })
    } else {
      this.hotelesService.createHotel(datosFormulario).subscribe(hotel => {
        this.router.navigateByUrl('/hoteles');
      })
    }
  }

  hasError(field: string): boolean {
    const errorsObjetc = this.hotelForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObjetc);

    if(errors.length && (this.hotelForm.get(field)?.touched || this.hotelForm.get(field)?.dirty)){
      return true;
    }

    return false;
  }

  getCurrentError(field: string): string {
    const errorsObjetc = this.hotelForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObjetc);

    if(!errors)
        return '';

    return errors[0];
  }

  getFormTitle(): string {
    return this.hotelId ? 'Editar hotel' : 'Registrar hotel';
  }

  private loadDataIntoForm(): void{
    this.hotelId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('alex: ');

    if(this.hotelId) {
      this.hotelesService.getHotel(this.hotelId).subscribe(hotel => {
        if(hotel.servicios != undefined &&  Array.isArray(hotel.servicios)) {
          // const serviciosSeleccionados = JSON.parse(hotel.servicios);
          this.hotelForm.patchValue({
            ...hotel,
            // servicios: serviciosSeleccionados
          });
        }

        // // Actualizar los servicios seleccionados en la lista local
        // this.serviciosSeleccionados = serviciosSeleccionados;
      })
    }
  }

  isServicioSelected(servicioId: string): boolean {
    return this.serviciosSeleccionados.some(servicio => servicio.id === servicioId);
  }
}
