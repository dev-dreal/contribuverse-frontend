import { BlogsComponent } from './blogs.component';
import { Routes } from '@angular/router';
import { SingleBlogComponent } from './main-content/single-blog/single-blog.component';
import { AddBlogComponent } from './main-content/add-blog/add-blog.component';
import { authGuard } from '../../guards/auth.guard';

export const BlogsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BlogsComponent,
      },
      {
        path: 'add-blog',
        canActivate: [authGuard],
        component: AddBlogComponent,
      },
      {
        path: ':id',
        component: SingleBlogComponent,
      },
    ],
  },
];
