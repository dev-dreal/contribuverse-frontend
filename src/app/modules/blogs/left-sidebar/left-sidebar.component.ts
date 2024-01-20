import { Component } from '@angular/core';
import { SidebarMenuItemComponent } from '../../../shared/components/ui/sidebar-menu-item/sidebar-menu-item.component';

@Component({
  selector: 'left-sidebar',
  standalone: true,
  imports: [SidebarMenuItemComponent],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss',
})
export class LeftSidebarComponent {
  menuItems = [
    { icon: 'assets/svgs/logo.svg', label: 'Home', route: '/home' },
    { icon: 'assets/svgs/blogs.svg', label: 'Blogs', route: '/blogs' },
    { icon: 'assets/svgs/news.svg', label: 'News', route: '/news' },
    { icon: 'assets/svgs/jobs.svg', label: 'Jobs', route: '/jobs' },
  ];
}
