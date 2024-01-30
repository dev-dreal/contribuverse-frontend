import { Component, EventEmitter, Output } from '@angular/core';
import { NavLinkComponent } from '../nav-link/nav-link.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'menu-mobile',
  standalone: true,
  imports: [CommonModule, NavLinkComponent],
  templateUrl: './menu-mobile.component.html',
  styleUrl: './menu-mobile.component.scss',
})
export class MenuMobileComponent {
  @Output() isCloseMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  navLinks = [
    { label: 'HOME', route: '/home' },
    { label: 'ABOUT', route: '/about' },
    { label: 'NEWS', route: '/news' },
    { label: 'BLOGS', route: '/blogs' },
  ];

  closeMenu() {
    this.isCloseMenu.emit(true);
  }
}
