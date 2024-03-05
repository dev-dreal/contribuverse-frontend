import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() isNavLinkClicked = new EventEmitter<boolean>();

  navLinks = [
    { label: 'Robotics', route: 'robotics' },
    { label: 'Metaverse', route: 'metaverse' },
    { label: 'Gaming', route: 'gaming' },
    { label: 'Movies', route: 'movies' },
  ];

  onNavClicked() {
    this.isNavLinkClicked.emit(true);
  }
}
