import { Component, effect, signal } from '@angular/core';
import { GlobalsService } from '../../services/globals/globals.service';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { fadingAnimation } from '../../helpers/animations';
import { MenuMobileComponent } from '../../shared/components/ui/menu-mobile/menu-mobile.component';
import { NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { CommonModule } from '@angular/common';
import { NavigationEnd } from '@angular/router';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    NgxUiLoaderModule,
    HeaderComponent,
    BodyComponent,
    MenuMobileComponent,
  ],
  providers: [GlobalsService],
  animations: [fadingAnimation],
})
export class HomeComponent {
  SPINNER = SPINNER;
  isHamburgerMenuOpen = signal(false);
  isGetStartedButtonClicked = signal(false);

  constructor(private globals: GlobalsService) {
    effect(() => {
      if (this.isGetStartedButtonClicked()) {
        this.loadWhenNavigateToDashboard();
      }
    });
  }

  initiateLoader(isClicked: boolean) {
    this.isGetStartedButtonClicked.set(isClicked);
  }

  // The function below adds a loader between the duration of navigating from the home page to the dashboard page, for better UX
  loadWhenNavigateToDashboard() {
    this.globals.loader.start();
    const navigationSubscription = this.globals.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1),
      )
      .subscribe(() => {
        // Navigation complete, stop the loader
        this.globals.loader.stopAll();
        navigationSubscription.unsubscribe();
      });
  }

  updateMenuStatus(isClosed: boolean) {
    this.isHamburgerMenuOpen.set(isClosed);
  }
}
