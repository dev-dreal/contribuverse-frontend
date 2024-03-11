import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sidebar-menu-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar-menu-item.component.html',
  styleUrl: './sidebar-menu-item.component.scss',
})
export class SidebarMenuItemComponent {
  @Input() icon: string = '';
  @Input({ required: true }) label: string = '';
  @Input({ required: true }) route: string = '';
  @Input() isBgDarker: boolean = false;
  @Input() isLink: boolean = true;
  @Input() removeLabelOnResponsive: boolean = false;
  @Input() height: string = '18';

  get isMobile(): boolean {
    return window.innerWidth <= 768;
  }
}
