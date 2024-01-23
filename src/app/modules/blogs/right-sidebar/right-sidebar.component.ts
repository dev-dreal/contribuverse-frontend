import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RightSidebarNotificationComponent } from './right-sidebar-notification/right-sidebar-notification.component';
import { SidebarMenuItemComponent } from '../../../shared/components/ui/sidebar-menu-item/sidebar-menu-item.component';
import { TrendingFeedsComponent } from './trending-feeds/trending-feeds.component';
import { ProfileActivityComponent } from './profile-activity/profile-activity.component';

@Component({
  selector: 'right-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RightSidebarNotificationComponent,
    SidebarMenuItemComponent,
    TrendingFeedsComponent,
    ProfileActivityComponent,
  ],
  templateUrl: './right-sidebar.component.html',
  styleUrl: './right-sidebar.component.scss',
})
export class RightSidebarComponent {}
