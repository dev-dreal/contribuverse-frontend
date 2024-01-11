import { Component } from '@angular/core';
import { AboutTextComponent } from './about-text/about-text.component';
import {
  fadingAnimation,
  quarterCircleAnimation,
} from '../../helpers/animations';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AboutTextComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [fadingAnimation, quarterCircleAnimation],
})
export class AboutComponent {
  animationState: 'enterBottomLeft' | 'enterTopRight' = 'enterBottomLeft';
  navs = [
    { isVisible: true, enterDirection: 'enterBottomLeft' },
    { isVisible: false, enterDirection: 'enterTopRight' },
    { isVisible: false, enterDirection: 'enterTopRight' },
    { isVisible: false, enterDirection: 'enterTopRight' },
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
    // Hide all navs initially
    this.navs.forEach((nav) => (nav.isVisible = false));

    // Show the selected nav
    this.navs[index].isVisible = true;

    // Set enter direction for previous nav
    if (index > 0) {
      this.navs[index - 1].enterDirection = 'enterTopRight';
    } else {
      // Reverse animation for the last nav
      this.navs[this.navs.length - 1].enterDirection = 'enterBottomLeft';
    }
  }
}
