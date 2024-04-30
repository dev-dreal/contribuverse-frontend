import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';

export const AppRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./modules/about/about.component').then(
            (m) => m.AboutComponent,
          ),
      },
      {
        path: 'blogs',
        loadChildren: () =>
          import('./modules/blogs/blogs.routes').then((m) => m.BlogsRoutes),
      },
      {
        path: 'news',
        loadChildren: () =>
          import('./modules/news/news.routes').then((m) => m.NewsRoutes),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((m) => m.AuthRoutes),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user-dashboard/user-dashboard.routes').then(
        (m) => m.UserDashBoardRoutes,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
