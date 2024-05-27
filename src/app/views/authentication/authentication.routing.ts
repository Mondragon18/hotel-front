import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import { isGuestGuard } from 'src/app/core/guards/auth.guard';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
        canActivate: [isGuestGuard]
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
        canActivate: [isGuestGuard]
      },
    ],
  },
];
