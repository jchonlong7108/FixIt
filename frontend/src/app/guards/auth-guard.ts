// frontend/src/app/guards/auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  // Inyectamos los servicios necesarios
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.loggedIn()) {
    return true; // Si está logueado, pasa
  } else {
    router.navigate(['/login']); // Si no, vete al login
    return false;
  }
};
