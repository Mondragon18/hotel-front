import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {

  loginForm: FormGroup;
  errors: any; 

  constructor(
    private authService: AuthService,
    private tokenService: TokenService, 
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  onSubmit(): void {
    this.cleanErros();
    this.authService.login(this.loginForm.value).subscribe(
      response => this.handleResponse(response),
      errors => this.handleErrors(errors)
    );
  }

  private handleResponse(response: any):void {
    this.tokenService.handleToken(response.token);
    this.tokenService.handleUsers(response.user);
    this.router.navigateByUrl('/');
  }

  private handleErrors(errors:any): void {
    this.errors = errors.error;
  }

  private cleanErros(): void {
    this.errors = null;
  }
}
