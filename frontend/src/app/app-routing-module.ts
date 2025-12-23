// frontend/src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importamos tus componentes
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { TaskList } from './components/task-list/task-list';
import { TaskForm } from './components/task-form/task-form';
import { UserList } from './components/user-list/user-list';
import { UserForm } from './components/user-form/user-form';

// Importamos el guardián de seguridad (lo configuraremos en un momento)
import { authGuard } from './guards/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }, // Ruta por defecto
  { path: 'login', component: Login },
  
  
  // Rutas Protegidas (Solo si estás logueado)
  { path: 'tasks', component: TaskList, canActivate: [authGuard] },
  { path: 'tasks/create', component: TaskForm, canActivate: [authGuard] },
  { path: 'tasks/edit/:id', component: TaskForm, canActivate: [authGuard] },
  { path: 'users', component: UserList, canActivate: [authGuard] },
  { path: 'users/create', component: UserForm, canActivate: [authGuard] },
  { path: 'users/edit/:id', component: UserForm, canActivate: [authGuard] } // Deberías crear un AdminGuard, pero usemos authGuard por ahora
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }