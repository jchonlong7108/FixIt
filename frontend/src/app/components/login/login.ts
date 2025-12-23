import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: false
})
export class Login {

  // Objeto para capturar los datos del formulario
  user = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  logIn() {
    this.authService.login(this.user).subscribe(
      res => {
        console.log(res);
        // Guardamos el token y el rol en el navegador
        localStorage.setItem('token', res.token);
        localStorage.setItem('user_role', res.user.rol);
        localStorage.setItem('user_name', res.user.nombre);
        // Redirigimos a la pantalla de tareas
        this.router.navigate(['/tasks']);
      },
      err => {
        console.log(err);
        alert('Error: Usuario o contraseña incorrectos');
      }
    );
  }
}
