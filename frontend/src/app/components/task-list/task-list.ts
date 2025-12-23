import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TaskService } from '../../services/task';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
  standalone: false // Importante: mantén esto si lo pusiste antes
})
export class TaskList implements OnInit {

  pendientes: any[] = [];
  completadas: any[] = [];

  constructor(
    private taskService: TaskService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef // Public para usarlo en el HTML
  ) { }

  ngOnInit(): void {
  // Pequeño truco: Verificar si hay token antes de pedir tareas
    if (this.authService.loggedIn()) {
        this.obtenerTareas();
    } else {
        // Si no hay token, forzar salida (aunque el Guard ya debería hacerlo)
        this.authService.logout();
    }
  }

  obtenerTareas() {
    this.taskService.getTasks().subscribe(
      res => {
        // Separamos las tareas aquí mismo
        this.pendientes = res.filter((t: any) => !t.completada);
        this.completadas = res.filter((t: any) => t.completada);
        this.cdr.detectChanges(); // Forzar actualización de la vista
      },
      err => console.log('Error obteniendo tareas:', err)
    );
  }

  borrarTarea(id: string) {
    if (confirm('¿Eliminar tarea?')) {
      this.taskService.deleteTask(id).subscribe(() => this.obtenerTareas());
    }
  }

  finalizarTarea(task: any) {
    const comentario = prompt('Escribe la resolución para el usuario:');
    if (comentario) {
      const data = {
        completada: true,
        resolucion: comentario
      };
      
      this.taskService.updateTask(task._id, data).subscribe(
        () => {
          alert('Tarea finalizada correctamente');
          this.obtenerTareas();
        },
        err => alert('Error al finalizar')
      );
    }
  }
}