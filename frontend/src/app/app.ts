import { Component } from '@angular/core';
import { AuthService } from './services/auth'; // Importar

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: false
})
export class App {
  title = 'frontend';

  // Inyectar como PUBLIC para usarlo en el HTML (*ngIf="authService.loggedIn()")
  constructor(public authService: AuthService) {} 
}
