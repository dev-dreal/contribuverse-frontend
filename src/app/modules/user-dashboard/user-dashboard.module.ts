import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../guards/auth.guard';
import { UserDashboardComponent } from './user-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { ContributionsComponent } from './contributions/contributions.component';
import { NgModule } from '@angular/core';

const blogRoutes: Routes = [
  {
    path: '',
    component: UserDashboardComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'contributions',
        component: ContributionsComponent,
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(blogRoutes)],
})
export class UserDashBoardModule {}
