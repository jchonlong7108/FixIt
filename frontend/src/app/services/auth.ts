// frontend/src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'https://fixit-v615.onrender.com/api/auth'; // La ruta de tu backend

  constructor(private http: HttpClient, private router: Router) { }

  // 1. REGISTRO
  registro(user: any) {
    return this.http.post<any>(this.URL + '/register', user);
  }

  // 2. LOGIN
  login(user: any) {
    return this.http.post<any>(this.URL + '/login', user);
  }

  // 3. VERIFICAR SI ESTÁ LOGUEADO
  loggedIn() {
    // Retorna 'true' si existe un token en el navegador
    return !!localStorage.getItem('token');
  }

  // 4. CERRAR SESIÓN
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_role');
    this.router.navigate(['/login']);
  }

  // 5. OBTENER EL TOKEN
  getToken() {
    return localStorage.getItem('token');
  }

  // 6. OBTENER EL ROL (Para saber si mostrar botones de borrar/editar)
  getRole() {
    return localStorage.getItem('user_role');
  }

  // Agrega este método
  getUserName() {
    return localStorage.getItem('user_name') || 'Usuario';
  }
  
  // 7. VERIFICAR SI ES ADMIN
  isAdmin() {
    return this.getRole() === 'ADMIN';
  }
}