import { Component } from '@angular/core';
import {
  trigger,
  style,
  transition,
  query,
  group,
  animate,
  state,
} from '@angular/animations';
import { AboutTextComponent } from './about-text/about-text.component';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AboutTextComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(1000, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AboutComponent {
  constructor() {}

  ngOnInit(): void {}

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
}
