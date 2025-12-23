import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  standalone: false
})
export class UserList implements OnInit {
  users: any[] = [];
  URL = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    const headers = new HttpHeaders({'x-auth-token': this.authService.getToken() || ''});
    
    this.http.get<any>(this.URL, { headers }).subscribe(res => {
        this.users = res;        // 1. Primero asignamos los datos que llegaron
        this.cdr.detectChanges(); // 2. Luego forzamos la actualización visual
    });
}

  // user-list.component.ts
  deleteUser(id: string) {
    if(confirm('¿Borrar usuario?')) {
      const headers = new HttpHeaders({'x-auth-token': this.authService.getToken() || ''});
      
      this.http.delete(`${this.URL}/${id}`, { headers }).subscribe(
        () => {
          // ÉXITO: Volvemos a pedir la lista al servidor
          this.getUsers(); 
        },
        (error) => {
          console.error(error);
          alert('No se pudo eliminar');
        }
      );
    }
  }
}