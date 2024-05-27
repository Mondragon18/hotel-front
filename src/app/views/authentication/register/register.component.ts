import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


import Swal from 'sweetalert2'
import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from '../../../core/services/token.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {

  public formSubmitted = false;

  registerForm: FormGroup;
  errors: any;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService, 
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
        nombres: [''],
        apellidos: [''],
        email: [''],
        password: [''],
        password_confirmation: [''],
    });
  }

  onSubmit(): void{
    this.cleanErros();
    this.authService.register(this.registerForm.value).subscribe(
      response => this.handleResponse(response),
      errors => this.handleErrors(errors)
    );
  }

  private handleResponse(response: any):void {
    this.tokenService.handleToken(response.token)
    this.tokenService.handleUsers(response.user)
    this.router.navigateByUrl('/');
  }

  private handleErrors(errors:any): void {
    this.errors = errors.error;
  }

  private cleanErros(): void {
    this.errors = null;
  }
}
