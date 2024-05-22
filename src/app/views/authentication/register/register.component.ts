import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroForm } from 'src/app/core/interfaces/registro.form.interfaces';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {

  constructor(
    private router: Router,

  ) {}

  public formSubmitted = false;

  registerForm = new FormGroup({
    nombre: new FormControl('maria', [Validators.required, Validators.minLength(6),  Validators.maxLength( 20 ), Validators.pattern('[A-zÀ-ú, ,.]*')]),
    apellido: new FormControl('mondragon', [Validators.required, Validators.minLength(6),  Validators.maxLength( 20 ), Validators.pattern('[A-zÀ-ú, ,.]*')]),
    // usuario: new FormControl('mondragonm', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('mondragon0303@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('abc123', [Validators.required, Validators.minLength( 8 ), Validators.maxLength( 36 )]),
    password2: new FormControl('abc123', [Validators.required, Validators.minLength( 8 ), Validators.maxLength( 36 )]),
  });

  get f() {
    return this.registerForm.controls;
  }

  crearUsuario(){
    this.formSubmitted = true;
    if (this.registerForm.invalid) { return }
    console.log("formualrio ", this.registerForm.value)

    // const registroData: RegistroForm = this.registerForm.value as RegistroForm;


    // this.userService.registro(registroData).subscribe(
    //   resp => {
    //     const email = this.registerForm.get('email')?.value;        
    //     this.Toast.fire({ icon: resp.alert, title: resp.msg })
    //     if (resp.alert = 'success') {
    //       this.router.navigate( ['/confirmacion/correo', email] );
    //     }
    //   },

    //   (err) => { this.Toast.fire({ icon: 'error', title: err }) }
    // );

  }


  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else{
      return false;
    }
  }

  aceptaTerminos(){
    return !this.registerForm.get('termino')?.value && this.formSubmitted;
  }

  passNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    if ((pass1 === pass2) && this.formSubmitted == false) {
      return false;
    } else {
      return true;
    }
  }

  passwordsAreEquals(control: AbstractControl): ValidationErrors | null {
    const pass1 = control.parent?.get('password')?.value;
    const pass2 = control.value;
    return !pass1 || !pass2 || pass1 !== pass2 ? { isNotEqual: true } : null;
  }

  public Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  get name() {return this.registerForm.get('name');}
  get email() {return this.registerForm.get('email');}
  get password() {return this.registerForm.get('password');}
  get password2() {return this.registerForm.get('password2');}
}
