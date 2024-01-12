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
  animationState: WritableSignal<string> = signal('enterBottomLeft');
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

  selectNav(selectedIndex: number) {
    if (selectedIndex === this.currentNavIndex) {
      // No action needed if the selected index is the same
      return;
    }

    // Check if the selected index is adjacent to the current index
    if (!this.isAdjacent(selectedIndex, this.currentNavIndex)) {
      // Do not allow non-adjacent transitions
      return;
    }

    // Determine the direction of navigation
    const isMovingForward = selectedIndex > this.currentNavIndex;

    // Update the animation states
    this.navs[selectedIndex].animationState = isMovingForward
      ? 'enterBottomLeft'
      : 'enterTopRight';

    this.navs[this.currentNavIndex].animationState = isMovingForward
      ? 'leaveTopRight'
      : 'leaveBottomLeft';

    // Update visibility
    this.navs[this.currentNavIndex].isVisible = false;
    this.navs[selectedIndex].isVisible = true;
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
}
