import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';

const newsRoutes: Routes = [
  {
    path: '',
    component: NewsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(newsRoutes), NewsComponent],
})
export class NewsModule {}
