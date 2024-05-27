import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from './sidebar-data';

import { NavService } from '../../../core/services/nav.service';
import { TokenService } from '../../../core/services/token.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  
  errors: any; 
  navItems = navItems;

  constructor(
    public navService: NavService,
    private authService: AuthService,
    private tokenService: TokenService, 
    private router: Router 
  ) {}

  ngOnInit(): void {}

  logout(): void {
    // this.tokenService.revokeToken()
    // this.router.navigateByUrl('/authentication/login');
    const token = { token: this.tokenService.getToken() };
    this.authService.logout().subscribe(
      response => this.handleResponse(response),
      errors => this.handleErrors(errors)
    );
  }

  private handleResponse(response: any):void {
    this.tokenService.revokeToken()
    this.router.navigateByUrl('/authentication/login');
  }

  private handleErrors(errors:any): void {
    this.errors = errors.error;
  }
}
