import { Component, Signal, computed, inject, signal } from '@angular/core';
import { AboutTextComponent } from './about-text/about-text.component';
import {
  fadingAnimation,
  longerFadingAnimation,
  quarterCircleAnimation,
} from '../../helpers/animations';
import { CommonModule } from '@angular/common';
import { InitialLoaderComponent } from '../../shared/components/smart/initial-loader/initial-loader.component';
import { NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { GlobalsService } from '../../services/globals/globals.service';
import { MenuMobileComponent } from '../../shared/components/ui/menu-mobile/menu-mobile.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    AboutTextComponent,
    InitialLoaderComponent,
    NgxUiLoaderModule,
    MenuMobileComponent,
  ],
  providers: [GlobalsService],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [fadingAnimation, longerFadingAnimation, quarterCircleAnimation],
})
export class AboutComponent {
  SPINNER = SPINNER;

  currentNavIndex: number = 0;
  isAnimationDone: boolean = false;
  isLoading: boolean = true;
  currentMobileImageIndex: number = 0; // for mobile view

  isMenuOpen = signal(false);

  navs = [
    { isVisible: true, animationState: 'enterBottomLeft' },
    { isVisible: false, animationState: 'enterBottomLeft' },
    { isVisible: false, animationState: 'enterBottomLeft' },
    { isVisible: false, animationState: 'enterBottomLeft' },
  ];

  images = [
    {
      bgImg: 'assets/svgs/ellipse-1.svg',
      imgSrc:
        'assets/svgs/internet-network-technology-background-wallpaper.svg',
    },
    {
      bgImg: 'assets/svgs/ellipse-2.svg',
      imgSrc: 'assets/svgs/virtual-reality-man.svg',
    },
    {
      bgImg: 'assets/svgs/ellipse-3.svg',
      imgSrc: 'assets/svgs/the-new-earth.svg',
    },
    {
      bgImg: 'assets/svgs/ellipse-4.svg',
      imgSrc: 'assets/svgs/space-man-holding-earth.svg',
    },
  ];

  mobileImages = [
    {
      title: 'Floating Laptop',
      imgSrc: 'assets/gifs/floating-laptop.gif',
    },
    {
      title: "Web Developer's Setup",
      imgSrc: 'assets/gifs/web-dev-setup.gif',
    },
    {
      title: 'Dev at Work',
      imgSrc: 'assets/gifs/dev-at-work.gif',
    },
  ];

  result = signal(this.isAdjacent(0, 1));

  // Dependency Injection
  private globals = inject(GlobalsService);
  // End of Dependency Injection

  ngOnInit() {
    this.globals.loader.start();

    setTimeout(() => {
      this.globals.loader.stopAll();
    }, 3000);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    /* The `setInterval` function in the code snippet is used to repeatedly update the
    `currentMobileImageIndex` property of the `AboutComponent` class. */
    setInterval(() => {
      this.currentMobileImageIndex =
        (this.currentMobileImageIndex + 1) % this.mobileImages.length;
    }, 4000);
  }

  selectNav(index: number) {
    if (index === this.currentNavIndex) {
      // No action needed if the selected index is the same
      return;
    }

    // Check if the selected index is adjacent to the current index
    this.result.set(this.isAdjacent(index, this.currentNavIndex));

    // Check if the selected index is adjacent to the current index
    if (!this.result().isAdjacent) {
      // The code below is to allow the bouncing animation to work repeatedly when the user clicks the invalid images continuously
      setTimeout(() => {
        this.result.set({
          isAdjacent: true,
          left: this.result().left,
          right: this.result().right,
        });
      }, 1000);

      // Do not allow non-adjacent transitions
      return;
    }

    // Determine the direction of navigation
    const isMovingForward = index > this.currentNavIndex;

    if (isMovingForward) {
      // Move the new nav to the bottom left
      this.navs[index].animationState = 'enterBottomLeft';

      // Move the current nav to the top right
      this.navs[this.currentNavIndex].animationState = 'leaveTopRight';
    } else {
      // Move the new nav to the top right
      this.navs[index].animationState = 'enterTopRight';

      // Move the current nav to the bottom left
      this.navs[this.currentNavIndex].animationState = 'leaveBottomLeft';
    }

    // Update visibility
    this.navs[this.currentNavIndex].isVisible = false;
    this.navs[index].isVisible = true;

    // Update the current index
    this.currentNavIndex = index;
  }

  private isAdjacent(
    index1: number,
    index2: number,
  ): { isAdjacent: boolean; left: number | null; right: number | null } {
    // Initialize left and right to null initially
    let left: number =
      (this.currentNavIndex - 1 + this.navs.length) % this.navs.length;
    let right: number = (this.currentNavIndex + 1) % this.navs.length;

    // Check if the indices are adjacent, considering wrap-around
    const maxIndex = this.navs.length - 1;
    const isAdjacent =
      Math.abs(index1 - index2) === 1 ||
      (index1 === 0 && index2 === maxIndex) ||
      (index1 === maxIndex && index2 === 0);

    // Return both the adjacency status and the determined left and right indexes
    return { isAdjacent, left, right };
  }

  animationDone(isDone: boolean) {
    this.isAnimationDone = isDone;
  }

  openMenu() {
    this.isMenuOpen.set(true);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
