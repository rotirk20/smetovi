import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // Inject the Router service to enable navigation
  const authService = inject(AuthService);
  const router = inject(Router);

  // Add your authentication logic here
  const isAuthenticated = authService.isLoggedIn();

  if (isAuthenticated) {
    return true;
  } else {
    // Redirect to the login page if not authenticated
    router.navigate(['/prijava'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
};
