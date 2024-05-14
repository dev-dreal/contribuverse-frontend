import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
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
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { authInterceptor } from './helpers/interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      BrowserModule,
      provideAuth(() => getAuth()),
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    ]),
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
  ],
};
