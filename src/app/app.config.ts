import {
  ApplicationConfig,
  PLATFORM_ID,
  importProvidersFrom,
  inject,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withDebugTracing,
  withPreloading,
} from '@angular/router';
import { AppRoutes } from './app.routing';
import { graphqlProvider } from './graphql.provider';
import { provideToastr } from 'ngx-toastr';
import { toastOptions } from './services/toaster/toaster.service';
import {
  provideFirebaseApp,
  initializeApp,
  FirebaseApp,
  initializeServerApp,
} from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { authInterceptor } from './helpers/interceptor';
import { isPlatformBrowser } from '@angular/common';
import { release } from 'os';
import { Request } from 'undici';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([BrowserModule]),
    provideAuth(() => getAuth(inject(FirebaseApp))),
    provideFirebaseApp(() => {
      if (isPlatformBrowser(inject(PLATFORM_ID))) {
        return initializeApp(environment.firebaseConfig);
      }
      const request = inject(Request, { optional: true });
      const authIdToken = request?.headers
        .get('Authorization')
        ?.split('Bearer ')[1];

      return initializeServerApp(environment.firebaseConfig, {
        authIdToken,
        releaseOnDeref: request || undefined,
      });
    }),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(
      AppRoutes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
      withDebugTracing(),
    ),
    provideToastr(toastOptions),
    graphqlProvider,
    provideClientHydration(),
  ],
};
