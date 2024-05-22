import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { ReservasComponent } from './reservas/reservas.component';
import { HotelesComponent } from './hoteles/hoteles.component';
import { HotelesFormComponent } from './hoteles/hoteles-form/hoteles-form.component';
import { ClasificacionHotelesComponent } from './clasificacion-hoteles/clasificacion-hoteles.component';
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
            path: 'habitaciones',
            component: HabitacionesComponent,
          },
        ],
      },
      {
          path:'calificacion_hoteles',
          children: [
            {
              path: '',
              component: ClasificacionHotelesComponent,
            },
          ]
      },
      {
        path: 'reservas',
        component: ReservasComponent,
      },
    ],
  },
];
