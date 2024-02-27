// import { CanActivateFn, Router } from '@angular/router';
// import { Auth0Service } from '../services/auth/auth0.service';
// import { inject } from '@angular/core';
// import { catchError, map, of } from 'rxjs';

// export const authGuard: CanActivateFn = (route, state) => {
//   const auth = inject(Auth0Service);
//   const router = inject(Router);

//   return auth.isAuthenticated$.pipe(
//     map((authenticated) => {
//       if (authenticated) {
//         return true;
//       } else {
//         auth.doLogin();
//         return false;
//       }
//     }),
//     catchError((error) => {
//       console.error('Error checking authentication:', error);
//       auth.doLogin();
//       return of(false);
//     }),
//   );
// };
