import { Component, EventEmitter, Output } from '@angular/core';
import { NavLinkComponent } from '../nav-link/nav-link.component';
import { CommonModule } from '@angular/common';
import { fadingAnimation } from '../../../../helpers/animations';

@Component({
  selector: 'menu-mobile',
  standalone: true,
  imports: [CommonModule, NavLinkComponent],
  templateUrl: './menu-mobile.component.html',
  styleUrl: './menu-mobile.component.scss',
  animations: [fadingAnimation],
})
export class MenuMobileComponent {
  @Output() isCloseMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  navLinks = [
    { label: 'HOME', route: '/home', hasSubmenu: false },
    { label: 'ABOUT', route: '/about', hasSubmenu: false },
    {
      label: 'NEWS',
      route: '/news',
      hasSubmenu: true,
      isSubmenuOpen: false,
      submenu: [
        { label: 'Robotics', route: '/news/robotics' },
        { label: 'Metaverse', route: '/news/metaverse' },
        { label: 'Gaming', route: '/news/gaming' },
        { label: 'Movies', route: '/news/movies' },
      ],
    },
    { label: 'BLOGS', route: '/blogs', hasSubmenu: false },
  ];

  closeMenu() {
    this.isCloseMenu.emit(true);
  }

  toggleSubmenu(index: number) {
    this.navLinks[index].isSubmenuOpen = !this.navLinks[index].isSubmenuOpen;
  }

  isSubmenuOpen(index: number) {
    return this.navLinks[index].isSubmenuOpen;
  }
}
