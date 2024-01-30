import { Component, signal } from '@angular/core';
import { GlobalsService } from '../../services/globals/globals.service';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { fadingAnimation } from '../../helpers/animations';
import { MenuMobileComponent } from '../../shared/components/ui/menu-mobile/menu-mobile.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [HeaderComponent, BodyComponent, MenuMobileComponent],
  providers: [GlobalsService],
  animations: [fadingAnimation],
})
export class HomeComponent {
  isHamburgerMenuOpen = signal(false);

  updateMenuStatus(isClosed: boolean) {
    this.isHamburgerMenuOpen.set(isClosed);
  }
}
