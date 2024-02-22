import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { fadingAnimation } from '../../helpers/animations';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LeftSidebarComponent,
    RightSidebarComponent,
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
  animations: [fadingAnimation],
})
export class BlogsComponent {}
