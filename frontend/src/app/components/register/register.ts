import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  standalone: false
})
export class Register {

  user = {
    nombre: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  registrar() {
    this.authService.registro(this.user).subscribe(
      res => {
        console.log(res);
        alert('¡Registro exitoso! Por favor inicia sesión.');
        // Al registrarse, lo mandamos al login para que entre
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
        alert('Error: ' + err.error.msg); // Muestra el mensaje del backend (ej. "Usuario ya existe")
      }
    );
  }
}
