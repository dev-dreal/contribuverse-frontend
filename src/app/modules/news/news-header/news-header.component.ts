import { Component, EventEmitter, Output, inject, input } from '@angular/core';
import { NavLinkComponent } from '../../../shared/components/ui/nav-link/nav-link.component';
import { RouterLink } from '@angular/router';
import { GlobalsService } from '../../../services/globals/globals.service';
import { fadingAnimation } from '../../../helpers/animations';

@Component({
  selector: 'news-header',
  standalone: true,
  imports: [NavLinkComponent, RouterLink],
  templateUrl: './news-header.component.html',
  styleUrl: './news-header.component.scss',
  animations: [fadingAnimation],
})
export class NewsHeaderComponent {
  @Output() isNavLinkClicked = new EventEmitter<boolean>();

  selectedActiveRouteIndex = input.required<number>();

  // DEPENDENCY INJECTION
  private globals = inject(GlobalsService);
  // END OF DEPENDENCY INJECTION

  navLinks = [
    { label: 'Robotics', route: 'robotics' },
    { label: 'Metaverse', route: 'metaverse' },
    { label: 'Gaming', route: 'gaming' },
    { label: 'Movies', route: 'movies' },
  ];

  onNavClicked() {
    this.isNavLinkClicked.emit(true);
    this.globals.route.paramMap.subscribe((params) => {
      console.log(params);
    });
    console.log(window.location.pathname);
  }
}
