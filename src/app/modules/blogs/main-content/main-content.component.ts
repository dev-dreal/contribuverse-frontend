import { Component, effect, signal } from '@angular/core';
import { LatestBlogsComponent } from './latest-blogs/latest-blogs.component';
import { BlogCategoriesComponent } from './blog-categories/blog-categories.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { CommonModule } from '@angular/common';
import { GlobalsService } from '../../../services/globals/globals.service';
import { filter, take } from 'rxjs';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'main-content',
  standalone: true,
  imports: [
    CommonModule,
    NgxUiLoaderModule,
    BlogCategoriesComponent,
    SearchBarComponent,
    LatestBlogsComponent,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {
  SPINNER = SPINNER;
  isAddBlogButtonClicked = signal(false);

  constructor(private globals: GlobalsService) {
    effect(() => {
      if (this.isAddBlogButtonClicked()) {
        this.loadWhenNavigateToAddBlogPage();
      }
    });
  }

  initiateLoader(isClicked: boolean) {
    this.isAddBlogButtonClicked.set(isClicked);
  }

  // The function below adds a loader between the duration of navigating from the home page to the dashboard page, for better UX
  loadWhenNavigateToAddBlogPage() {
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
}
