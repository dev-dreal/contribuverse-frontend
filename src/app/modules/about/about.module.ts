import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { NgModule } from '@angular/core';

const AboutRoutes: Routes = [
  {
    path: '',
    component: AboutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(AboutRoutes)],
})
export class AboutModule {}
