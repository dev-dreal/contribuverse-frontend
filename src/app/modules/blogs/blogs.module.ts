import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { RouterModule, Routes } from '@angular/router';

const blogsRoutes: Routes = [
  {
    path: '',
    component: BlogsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(blogsRoutes), BlogsListComponent],
})
export class BlogsModule {}
