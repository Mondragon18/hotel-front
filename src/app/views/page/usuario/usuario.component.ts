import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/core/models/usuarios.models';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuarios[] = [];
  total: number = 0;

  constructor(
    private UsuarioServices:  UsuarioService
  ){

  }

  ngOnInit(): void {
    this.loadDataIntoTable();
  }

  private loadDataIntoTable(): void {
    this.UsuarioServices.getUsuarios().subscribe(resp => {
      this.usuarios = resp;
    })
  }

  // private calculateTotal(): void {
  //   this.total = this.usuarios.reduce((accumulated, currentValue) => {
  //     return accumulated + Number(currentValue.amount);
  //   }, 0);
  // }
}
