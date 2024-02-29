import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { first, map } from 'rxjs';
import { SupabaseService } from '../services/auth/supabase.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const supabase = inject(SupabaseService);

  const isLoggedIn = localStorage.getItem(
    `sb-${environment.supabase.tag}-auth-token`,
  );
  console.log('isLoggedIn', isLoggedIn);

  return supabase.$profile.pipe(
    // We only want to get the first emitted value from the $profile
    first(),
    map((profile) => {
      // Allow access if the user's profile is set
      if (profile) return true;
      // If the user is not signed in and does not have a profile, do not allow access
      else {
        // Redirect to the /login route, while capturing the current url so we can redirect after login
        router.navigate(['/auth/login'], {
          queryParams: { redirect_url: state.url },
        });
        return false;
      }
    }),
  );
};
