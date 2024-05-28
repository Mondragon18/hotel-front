import { Routes } from '@angular/router';

import { ReservasComponent } from './agente/reservas/reservas.component';
import { ClasificacionHotelesComponent } from './viajero/hoteles/clasificacion-hoteles.component';
import { HotelesComponent } from './agente/hoteles/hoteles.component';
import { HotelesFormComponent } from './agente/hoteles/hoteles-form/hoteles-form.component';
import { HabitacionesComponent } from './agente/hoteles/habitaciones/habitaciones.component';
import { isUserAuthenticatedGuard } from 'src/app/core/guards/auth.guard';
import { isPasajeroGuard, isAgenteGuard } from '../../core/guards/auth.guard';



export const PagesRoutes: Routes = [
  {
    path: '',
    component: HotelesComponent,
    canActivate: [isUserAuthenticatedGuard, isAgenteGuard]
  },
  {
    path: 'hoteles',
    children: [
      {
        path: '',
        component: HotelesComponent,
        canActivate: [isUserAuthenticatedGuard, isAgenteGuard]
      },
      {
        path: 'crear',
        component: HotelesFormComponent,
        canActivate: [isUserAuthenticatedGuard, isAgenteGuard]
      },
      {
        path: ':id/editar',
        component: HotelesFormComponent,
        canActivate: [isUserAuthenticatedGuard, isAgenteGuard]
      },
      {
        path: ':id/habitaciones',
        component: HabitacionesComponent,
        canActivate: [isUserAuthenticatedGuard, isAgenteGuard]
      },
    ],
  },
  {
      path:'agenda/tu/hotel/preferido',
      children: [
        {
          path: '',
          component: ClasificacionHotelesComponent,
          canActivate: [isPasajeroGuard]
        },
      ]
  },
  {
    path: 'reservas',
    component: ReservasComponent,
    canActivate: [isUserAuthenticatedGuard, isAgenteGuard]
  },
];
