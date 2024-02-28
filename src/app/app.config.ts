import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppRoutes } from './app.routing';
import { graphqlProvider } from './graphql.provider';
import { AuthModule } from '@auth0/auth0-angular';
import * as env from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      // AuthModule.forRoot({
      //   domain: env.environment.auth.domain,
      //   clientId: env.environment.auth.clientId,
      //   authorizationParams: {
      //     redirect_uri: window.location.origin,
      //   },
      //   errorPath: '/error',
      // }),
    ),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(AppRoutes),
    graphqlProvider,
  ],
};
