import { Routes } from '@angular/router';

import { ReservasComponent } from './agente/reservas/reservas.component';
import { ClasificacionHotelesComponent } from './agente/clasificacion-hoteles/clasificacion-hoteles.component';
import { HotelesComponent } from './agente/hoteles/hoteles.component';
import { HotelesFormComponent } from './agente/hoteles/hoteles-form/hoteles-form.component';
import { HabitacionesComponent } from './agente/hoteles/habitaciones/habitaciones.component';
import { isUserAuthenticatedGuard } from 'src/app/core/guards/auth.guard';



export const PagesRoutes: Routes = [
  {
    path: '',
    component: HotelesComponent,
    canActivate: [isUserAuthenticatedGuard]
  },
  {
    path: 'hoteles',
    children: [
      {
        path: '',
        component: HotelesComponent,
        canActivate: [isUserAuthenticatedGuard]
      },
      {
        path: 'crear',
        component: HotelesFormComponent,
        canActivate: [isUserAuthenticatedGuard]
      },
      {
        path: ':id/editar',
        component: HotelesFormComponent,
        canActivate: [isUserAuthenticatedGuard]
      },
      {
        path: ':id/habitaciones',
        component: HabitacionesComponent,
        canActivate: [isUserAuthenticatedGuard]
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
    canActivate: [isUserAuthenticatedGuard]
  },
];
