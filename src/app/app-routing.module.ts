import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { isGuestGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './views/error/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/page/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./views/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./views/extra/extra.module').then((m) => m.ExtraModule),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./views/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
        canActivate: [isGuestGuard]
      },
      {
        path: '**',
        component: PageNotFoundComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
