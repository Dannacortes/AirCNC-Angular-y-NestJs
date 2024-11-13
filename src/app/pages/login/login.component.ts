import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      Swal.fire('Error', 'Por favor, complete el formulario correctamente.', 'error');
      return;
    }

    const userCredentials = this.loginForm.value;

    this.auth.login(userCredentials).subscribe({
      next: (response) => {
        const { token } = response;
        this.auth.setCurrentUser(userCredentials, token);
        Swal.fire('Éxito', 'Has iniciado sesión correctamente.', 'success');
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        Swal.fire('Error', 'Credenciales incorrectas.', 'error');
      }
    });
  }
}
