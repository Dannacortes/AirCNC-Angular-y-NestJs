// src/app/components/signup/signup.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './sig-nup.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      Swal.fire('Error', 'Formulario inválido', 'error');
      return;
    }

    const { username, email, password } = this.signupForm.value;

    this.authService.signup(username, email, password).subscribe(
      (response) => {
        this.router.navigate(['/login']);
        Swal.fire('Éxito', 'Usuario registrado', 'success');
      },
      (error) => {
        Swal.fire('Error', 'Error al registrar el usuario', 'error');
      }
    );
  }
}
