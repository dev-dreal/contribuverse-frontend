import { Component } from '@angular/core';

@Component({
  selector: 'trending-feeds',
  standalone: true,
  imports: [],
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
