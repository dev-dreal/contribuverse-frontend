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
          import('./modules/blogs/blogs.module').then((m) => m.BlogsModule),
      },
      {
        path: 'news',
        loadChildren: () =>
          import('./modules/news/news.module').then((m) => m.NewsModule),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user-dashboard/user-dashboard.module').then(
        (m) => m.UserDashBoardModule,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
