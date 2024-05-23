import { Routes } from '@angular/router';
import { UsuarioComponent } from './agente/usuario/usuario.component';
import { ReservasComponent } from './agente/reservas/reservas.component';
import { ClasificacionHotelesComponent } from './clasificacion-hoteles/clasificacion-hoteles.component';
import { HotelesComponent } from './agente/hoteles/hoteles.component';
import { HotelesFormComponent } from './agente/hoteles/hoteles-form/hoteles-form.component';
import { HabitacionesComponent } from './agente/hoteles/habitaciones/habitaciones.component';



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
