import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppRoutes } from './app.routing';
import { graphqlProvider } from './graphql.provider';
import { provideToastr } from 'ngx-toastr';
import { toastOptions } from './services/toaster/toaster.service';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(AppRoutes, withComponentInputBinding()),
    provideToastr(toastOptions),
    graphqlProvider,
  ],
};
