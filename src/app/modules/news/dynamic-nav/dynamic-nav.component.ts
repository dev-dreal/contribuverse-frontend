import { Component, Input } from '@angular/core';

@Component({
  selector: 'dynamic-nav',
  standalone: true,
  imports: [],
  templateUrl: './dynamic-nav.component.html',
  styleUrl: './dynamic-nav.component.scss',
})
export class DynamicNavComponent {
  @Input() slidePosition: string = 'left';

  leftArrow = 'assets/svgs/left-arrow.svg';
  rightArrow = 'assets/svgs/right-arrow.svg';
}
