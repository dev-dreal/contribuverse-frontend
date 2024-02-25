import { NgModule } from '@angular/core';
import { BlogsComponent } from './blogs.component';
import { RouterModule, Routes } from '@angular/router';
import { SingleBlogComponent } from './main-content/single-blog/single-blog.component';
import { MainContentComponent } from './main-content/main-content.component';
import { AddBlogComponent } from './main-content/add-blog/add-blog.component';

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
  imports: [RouterModule.forChild(blogsRoutes), BlogsComponent],
})
export class BlogsModule {}
