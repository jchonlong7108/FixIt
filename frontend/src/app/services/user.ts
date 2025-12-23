import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'x-auth-token': this.authService.getToken() || ''
      })
    };
  }

  // 1. Obtener todos
  getUsers() {
    return this.http.get<any>(this.URL, this.getHeaders());
  }

  // 2. Obtener UNO solo (Para editar)
  getUser(id: string) {
    return this.http.get<any>(`${this.URL}/${id}`, this.getHeaders());
  }

  // 3. Crear Usuario (Desde Admin)
  createUser(user: any) {
    // Usamos la ruta de registro pública, pero sin loguearnos automáticamente
    return this.http.post<any>('http://localhost:3000/api/auth/register', user);
  }

  // 4. Editar Usuario
  updateUser(id: string, user: any) {
    return this.http.put<any>(`${this.URL}/${id}`, user, this.getHeaders());
  }

  // 5. Borrar Usuario
  deleteUser(id: string) {
    return this.http.delete<any>(`${this.URL}/${id}`, this.getHeaders());
  }
}