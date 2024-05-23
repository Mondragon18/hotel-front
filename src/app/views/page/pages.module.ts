import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { PagesRoutes } from './pages.routing';

import { UsuarioComponent } from './agente/usuario/usuario.component';
import { HotelesService } from 'src/app/core/services/hoteles.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { HotelesComponent } from './agente/hoteles/hoteles.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    MatCardModule,
    MatDialogModule
  ],
  declarations: [
    UsuarioComponent,
    HotelesComponent,
  ],
  exports: [
    TablerIconsModule,
  ],
  providers: [
    HotelesService,
  ]
})
export class PagesModule {}
