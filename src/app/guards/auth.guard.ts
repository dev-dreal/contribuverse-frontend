import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { SupabaseService } from '../services/auth/supabase.service';

export const authGuard: CanActivateFn = (route, state) => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  if (supabase._session || supabase.session) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
