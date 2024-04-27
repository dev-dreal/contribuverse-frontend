import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
  signal,
  effect,
  QueryList,
  ViewChildren,
  input,
} from '@angular/core';
import { NewsTabButtonComponent } from './news-tab-button/news-tab-button.component';

@Component({
  selector: 'dynamic-nav',
  standalone: true,
  imports: [NewsTabButtonComponent],
  templateUrl: './dynamic-nav.component.html',
  styleUrl: './dynamic-nav.component.scss',
})
export class DynamicNavComponent {
  @Input() slidePosition: number = 0;
  isNavLinkClicked = input<boolean>(false);
  @Output() slidePositionBtnEvent: EventEmitter<number> = new EventEmitter();
  @ViewChildren(NewsTabButtonComponent)
  myNewsTabButtons!: QueryList<NewsTabButtonComponent>;

  leftArrow = 'assets/svgs/left-arrow.svg';
  rightArrow = 'assets/svgs/right-arrow.svg';

  constructor() {
    effect(() => {
      this.myNewsTabButtons.forEach((tabButton) => {
        tabButton.isHeaderNavLinkClicked = this.isNavLinkClicked();
      });
    });
  }

  slide(position: number) {
    this.slidePositionBtnEvent.emit(position);
  }
}
