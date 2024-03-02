import { Component, signal } from '@angular/core';
import { SidebarMenuItemComponent } from '../../../shared/components/ui/sidebar-menu-item/sidebar-menu-item.component';
import {
  Profile,
  SupabaseService,
} from '../../../services/auth/supabase.service';
import { AuthSession, User } from '@supabase/supabase-js';
import { GlobalsService } from '../../../services/globals/globals.service';

@Component({
  selector: 'left-sidebar',
  standalone: true,
  imports: [SidebarMenuItemComponent],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss',
})
export class LeftSidebarComponent {
  session: AuthSession | null = null;
  loading: boolean = true;
  profile: Profile = {} as Profile;

  currentBlog = signal({
    label: 'Contribute',
    icon: 'assets/svgs/write.svg',
    route: '/blogs',
  });

  menuItems = [
    {
      icon: 'assets/svgs/logo.svg',
      label: 'Dashboard',
      route: '/user/dashboard',
    },
    { icon: 'assets/svgs/blogs.svg', label: 'Profile', route: '/user/profile' },
    {
      icon: 'assets/svgs/news.svg',
      label: 'Contributions',
      route: '/user/contributions',
    },
    {
      icon: 'assets/svgs/about.svg',
      label: 'Settings',
      route: '/user/settings',
    },
  ];
}
