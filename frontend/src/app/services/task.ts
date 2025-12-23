// frontend/src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private URL = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // METODO PRIVADO: Genera las cabeceras con el token
  // Esto se usa en cada petición para decir "Hola, soy yo y aquí está mi pase"
  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'x-auth-token': this.authService.getToken() || ''
      })
    };
  }

  // 1. OBTENER TAREAS
  getTasks() {
    return this.http.get<any>(this.URL, this.getHeaders());
  }

  // 2. CREAR TAREA
  createTask(task: any) {
    return this.http.post<any>(this.URL, task, this.getHeaders());
  }

  // 3. EDITAR TAREA (Solo Admin)
  updateTask(id: string, task: any) {
    return this.http.put<any>(`${this.URL}/${id}`, task, this.getHeaders());
  }

  // 4. BORRAR TAREA (Solo Admin)
  deleteTask(id: string) {
    return this.http.delete<any>(`${this.URL}/${id}`, this.getHeaders());
  }

  getTask(id: string) {
    return this.http.get<any>(`${this.URL}/${id}`, this.getHeaders());
  }
}
