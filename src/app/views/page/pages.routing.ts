import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { HabitacionesComponent } from './hoteles/habitaciones/habitaciones.component';
import { ReservasComponent } from './reservas/reservas.component';
import { HotelesComponent } from './hoteles/hoteles.component';
import { HotelesFormComponent } from './hoteles/hoteles-form/hoteles-form.component';
// import { AppDashboardComponent } from './dashboard/dashboard.component';


export const PagesRoutes: Routes = [

  {  
    path: '',
    children: [
      {
        path: 'usuario',
        component: UsuarioComponent,
      },
      {
        path: 'hoteles',
        children: [
          {
            path: '',
            component: HotelesComponent,
          },
          {
            path: 'crear',
            component: HotelesFormComponent,
          },
          {
            path: ':id/editar',
            component: HotelesFormComponent,
          },
          {
            path: ':id/habitaciones',
            component: HabitacionesComponent,
          },
        ],
      },
      {
        path: 'reservas',
        component: ReservasComponent,
      },
    ],
  },
];
