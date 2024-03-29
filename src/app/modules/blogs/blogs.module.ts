import { NgModule } from '@angular/core';
import { BlogsComponent } from './blogs.component';
import { RouterModule, Routes } from '@angular/router';
import { SingleBlogComponent } from './main-content/single-blog/single-blog.component';
import { AddBlogComponent } from './main-content/add-blog/add-blog.component';
import { authGuard } from '../../guards/auth.guard';

const blogsRoutes: Routes = [
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

@NgModule({
  imports: [RouterModule.forChild(blogsRoutes)],
})
export class BlogsModule {}
