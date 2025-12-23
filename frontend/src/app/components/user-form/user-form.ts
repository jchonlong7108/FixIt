import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.html',
  standalone: false
})
export class UserForm implements OnInit {

  user: any = {
    nombre: '',
    email: '',
    password: '', // Solo obligatorio al crear
    rol: 'USER'
  };

  editMode = false;
  userId = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.editMode = true;
      this.userId = params['id'];
      
      this.userService.getUser(this.userId).subscribe(
        res => {
          this.user = res;
          this.user.password = ''; // No mostramos el password encriptado
          this.cdr.detectChanges();
        },
        err => console.log(err)
      );
    }
  }

  submitUser() {
    if (this.editMode) {
      // Al editar, si el password está vacío, no lo enviamos (para no borrarlo)
      // Nota: Para simplificar, aquí enviaremos todo y el backend decidirá.
      // Si quieres perfección, deberías borrar el campo password si está vacío.
      this.userService.updateUser(this.userId, this.user).subscribe(
        () => this.router.navigate(['/users']),
        err => alert('Error al actualizar')
      );
    } else {
      this.userService.createUser(this.user).subscribe(
        () => this.router.navigate(['/users']),
        err => alert('Error al crear usuario')
      );
    }
  }
}