import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nav-link',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-link.component.html',
  styleUrl: './nav-link.component.scss',
})
export class NavLinkComponent {
  @Input({ required: true }) route: string = '';
  @Input({ required: true }) label: string = '';
  @Input() textColor: 'white' | 'black' = 'black';
  @Input() isTextShadow: boolean = true;
}
