import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { first, map } from 'rxjs';
import { SupabaseService } from '../services/auth/supabase.service';
import { FirebaseService } from '../services/auth/firebase.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // const supabase = inject(SupabaseService);
  const firebaseService = inject(FirebaseService);

  return firebaseService.user$.pipe(
    first(),
    map((user) => {
      if (user) return true;
      else {
        router.navigate(['/auth/login'], {
          queryParams: { redirect_url: state.url },
        });
        return false;
      }
    }),
  );

  // const isLoggedIn = localStorage.getItem(
  //   `sb-${environment.supabase.tag}-auth-token`,
  // );

  // return supabase.$profile.pipe(
  //   // We only want to get the first emitted value from the $profile
  //   first(),
  //   map((profile) => {
  //     // Allow access if the user's profile is set
  //     if (profile || isLoggedIn) return true;
  //     // If the user is not signed in and does not have a profile, do not allow access
  //     else {
  //       // Redirect to the /login route, while capturing the current url so we can redirect after login
  //       router.navigate(['/auth/login'], {
  //         queryParams: { redirect_url: state.url },
  //       });
  //       return false;
  //     }
  //   }),
  // );
};
