import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isLoggedIn = localStorage.getItem(
    `sb-${environment.supabase.tag}-auth-token`,
  );
  console.log('isLoggedIn', isLoggedIn);

  if (!isLoggedIn) {
    router.navigate(['/auth/login']);
    return false;
  } else {
    return true;
  }
};
