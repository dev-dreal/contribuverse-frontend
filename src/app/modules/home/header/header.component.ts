import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavLinkComponent } from '../../../shared/components/ui/nav-link/nav-link.component';
import { MenuMobileComponent } from '../../../shared/components/ui/menu-mobile/menu-mobile.component';
import { fadingAnimation } from '../../../helpers/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [NavLinkComponent, MenuMobileComponent],
  animations: [fadingAnimation],
})
export class HeaderComponent {
  @Input({ required: true }) isHamburgerMenuOpen: boolean = false;
  @Output() isMenuOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  navLinks = [
    { label: 'HOME', route: '/home' },
    { label: 'ABOUT', route: '/about' },
    { label: 'NEWS', route: '/news' },
    { label: 'BLOGS', route: '/blogs' },
  ];

  openMenu() {
    this.isMenuOpen.emit(true);
  }

  closeMenu() {
    this.isMenuOpen.emit(false);
  }
}
