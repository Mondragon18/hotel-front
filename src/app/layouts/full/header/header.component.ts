import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuarios } from 'src/app/core/models/usuarios.models';
import { TokenService } from '../../../core/services/token.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit  {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;

  nombre: string = '';
  apellido: string = '';
  email: string = '';

  usuario: any;

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.usuario = this.tokenService.getUsers();
    
    // this.nombre = this.tokenService.getUsers()?.nombres;
    // this.apellido = this.tokenService.getUsers()?.apellidos;
    // this.email = this.tokenService.getUsers()?.email;
  }
}
