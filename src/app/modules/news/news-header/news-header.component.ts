import { Component } from '@angular/core';
import { NavLinkComponent } from '../../../shared/components/ui/nav-link/nav-link.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'news-header',
  standalone: true,
  imports: [NavLinkComponent, RouterLink],
  templateUrl: './news-header.component.html',
  styleUrl: './news-header.component.scss',
})
export class NewsHeaderComponent {
  navLinks = [
    { label: 'Robotics', route: 'news/robotics' },
    { label: 'Metaverse', route: 'news/metaverse' },
    { label: 'Gaming', route: 'news/gaming' },
    { label: 'Movies', route: 'news/movies' },
  ];
}
