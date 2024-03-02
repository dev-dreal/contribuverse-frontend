import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { fadingAnimation } from '../../helpers/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, LeftSidebarComponent, RouterOutlet],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
  animations: [fadingAnimation],
})
export class UserDashboardComponent {}
