import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { fadingAnimation } from '../../helpers/animations';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [
    CommonModule,
    LeftSidebarComponent,
    MainContentComponent,
    RightSidebarComponent,
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
  animations: [fadingAnimation],
})
export class BlogsComponent {}
