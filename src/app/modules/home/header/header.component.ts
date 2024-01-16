import { Component } from '@angular/core';
import { NavLinkComponent } from '../../../shared/components/ui/nav-link/nav-link.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [NavLinkComponent],
})
export class HeaderComponent {}
