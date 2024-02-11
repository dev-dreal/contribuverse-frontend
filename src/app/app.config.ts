import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppRoutes } from './app.routing';
import { CommonModule } from '@angular/common';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client/core';

// const myUrl = 'https://countries.trevorblades.com/graphql';
const myUrl = 'https://contribuverse-backend-vert.vercel.app/api/graphql';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, CommonModule),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(AppRoutes),
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink): ApolloClientOptions<unknown> => ({
        link: ApolloLink.from([httpLink.create({ uri: myUrl })]),
        cache: new InMemoryCache(),
      }),
      deps: [HttpLink],
    },
    Apollo,
  ],
};
