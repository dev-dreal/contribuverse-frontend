import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { RoboticsComponent } from './tabs/robotics/robotics.component';
import { MetaverseComponent } from './tabs/metaverse/metaverse.component';
import { GamingComponent } from './tabs/gaming/gaming.component';
import { MoviesComponent } from './tabs/movies/movies.component';

const newsRoutes: Routes = [
  {
    path: '',
    component: NewsComponent,
    children: [
      {
        path: '',
        redirectTo: 'robotics',
        pathMatch: 'full',
      },
      {
        path: 'robotics',
        component: RoboticsComponent,
      },
      {
        path: 'metaverse',
        component: MetaverseComponent,
      },
      {
        path: 'gaming',
        component: GamingComponent,
      },
      {
        path: 'movies',
        component: MoviesComponent,
      },
      {
        path: '**',
        redirectTo: 'robotics',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(newsRoutes), NewsComponent],
})
export class NewsModule {}
