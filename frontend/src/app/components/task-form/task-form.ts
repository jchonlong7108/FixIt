import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TaskService } from '../../services/task';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css'],
  standalone: false
})
export class TaskForm implements OnInit {

  task = {
    titulo: '',
    descripcion: '',
    lugar: '',
    prioridad: 'BAJA'
  };

  editMode = false;
  currentTaskId = '';

  constructor(
    private taskService: TaskService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    
    // Si la URL tiene un ID (ej: /tasks/edit/654abc...)
    if (params['id']) {
      this.editMode = true;
      this.currentTaskId = params['id'];
      
      console.log("1. Pidiendo tarea con ID:", this.currentTaskId); // <--- CHIVATO 1

      this.taskService.getTask(this.currentTaskId).subscribe(
        res => {
          console.log("2. Datos recibidos del backend:", res); // <--- CHIVATO 2
          this.task = res;
          this.cdr.detectChanges(); 
        },
        err => {
          console.error("3. Error en la petición:", err); // <--- CHIVATO 3
        }
      );
    }
  }

  submitTask() {
    if (this.editMode) {
      this.taskService.updateTask(this.currentTaskId, this.task).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/tasks']);
        },
        err => console.log(err)
      );
    } else {
      this.taskService.createTask(this.task).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/tasks']);
        },
        err => console.log(err)
      );
    }
  }
}
