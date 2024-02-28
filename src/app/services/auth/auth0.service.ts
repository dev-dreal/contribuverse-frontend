// import { Injectable, inject } from '@angular/core';
// import { AuthService } from '@auth0/auth0-angular';
// import { GlobalsService } from '../globals/globals.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class Auth0Service {
//   public auth = inject(AuthService);
//   private globals = inject(GlobalsService);

//   public user$ = this.auth.user$;
//   public isAuthenticated$ = this.auth.isAuthenticated$;

//   ngOnInit() {
//     this.user$.subscribe({
//       next: (user) => {
//         if (user) {
//           console.log('User:', user);
//         }
//       },
//       error: (err) => {
//         console.error(err);
//       },
//     });
//   }

//   doLogin() {
//     this.auth.loginWithRedirect();
//   }

//   doLogout() {
//     this.globals.loader.start();
//     this.isAuthenticated$.subscribe({
//       next: (isAuthenticated) => {
//         if (isAuthenticated) {
//           this.auth.logout({
//             logoutParams: { returnTo: document.location.origin },
//           });
//         }
//         this.globals.loader.stopAll();
//       },
//       error: (err) => {
//         this.globals.loader.stopAll();
//         console.error(err);
//       },
//     });
//   }
// }
