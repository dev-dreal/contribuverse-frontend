import { Component } from '@angular/core';
import { SidebarMenuItemComponent } from '../../../../shared/components/ui/sidebar-menu-item/sidebar-menu-item.component';

@Component({
  selector: 'trending-feeds',
  standalone: true,
  imports: [SidebarMenuItemComponent],
  templateUrl: './trending-feeds.component.html',
  styleUrl: './trending-feeds.component.scss',
})
export class TrendingFeedsComponent {
  trendingFeeds = [
    {
      id: 1,
      title: 'Metaverse',
      image: 'assets/svgs/metaverse.svg',
    },
    {
      id: 2,
      title: 'Game Controller',
      image: 'assets/svgs/game-controller.svg',
    },
    {
      id: 3,
      title: 'Dancing Robot',
      image: 'assets/svgs/dancing-robot.svg',
    },
    {
      id: 4,
      title: 'Blue Eye',
      image: 'assets/svgs/blue-eye.svg',
    },
  ];
}
