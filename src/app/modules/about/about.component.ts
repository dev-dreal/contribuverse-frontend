import { Component, WritableSignal, signal } from '@angular/core';
import { AboutTextComponent } from './about-text/about-text.component';
import {
  fadingAnimation,
  quarterCircleAnimation,
} from '../../helpers/animations';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, AboutTextComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [fadingAnimation, quarterCircleAnimation],
})
export class AboutComponent {
  currentNavIndex: number = 0;
  isAnimationDone: boolean = false;

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

  ngOnInit(): void {}

  selectNav(index: number) {
    if (index === this.currentNavIndex) {
      // No action needed if the selected index is the same
      return;
    }

    // Check if the selected index is adjacent to the current index
    if (!this.isAdjacent(index, this.currentNavIndex)) {
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

  private isAdjacent(index1: number, index2: number): boolean {
    // Check if the indices are adjacent, considering wrap-around
    const maxIndex = this.navs.length - 1;
    return (
      Math.abs(index1 - index2) === 1 ||
      (index1 === 0 && index2 === maxIndex) ||
      (index1 === maxIndex && index2 === 0)
    );
  }

  animationDone(isDone: boolean) {
    this.isAnimationDone = isDone;
  }
}
