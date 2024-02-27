import { Routes } from '@angular/router';
// import { LoginComponent } from './modules/login/login.component';

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
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./modules/about/about.module').then((m) => m.AboutModule),
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
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  {
    path: '**',
    redirectTo: '',
  },
];
