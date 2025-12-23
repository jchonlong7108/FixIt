// frontend/src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // <--- IMPORTANTE
import { FormsModule } from '@angular/forms'; // <--- IMPORTANTE

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { TaskList } from './components/task-list/task-list';
import { TaskForm } from './components/task-form/task-form';
import { UserList } from './components/user-list/user-list';
import { UserForm } from './components/user-form/user-form';

@NgModule({
  declarations: [
    App,
    Login,
    Register,
    TaskList,
    TaskForm,
    UserList,
    UserForm
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // <--- AGREGADO
    FormsModule       // <--- AGREGADO
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }