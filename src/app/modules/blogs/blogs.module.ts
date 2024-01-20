import { NgModule } from '@angular/core';
import { BlogsComponent } from './blogs.component';
import { RouterModule, Routes } from '@angular/router';

const blogsRoutes: Routes = [
  {
    path: '',
    component: BlogsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(blogsRoutes), BlogsComponent],
})
export class BlogsModule {}
