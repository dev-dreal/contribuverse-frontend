import { NgModule } from '@angular/core';
import { BlogsComponent } from './blogs.component';
import { RouterModule, Routes } from '@angular/router';
import { SingleBlogComponent } from './main-content/single-blog/single-blog.component';
import { MainContentComponent } from './main-content/main-content.component';

const blogsRoutes: Routes = [
  {
    path: '',
    component: BlogsComponent,
    children: [
      {
        path: '',
        component: MainContentComponent,
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
