import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewsTabButtonComponent } from '../../../shared/components/ui/news-tab-button/news-tab-button.component';

@Component({
  selector: 'dynamic-nav',
  standalone: true,
  imports: [NewsTabButtonComponent],
  templateUrl: './dynamic-nav.component.html',
  styleUrl: './dynamic-nav.component.scss',
})
export class DynamicNavComponent {
  @Input() slidePosition: string = 'left';
  @Output() slidePositionBtnEvent: EventEmitter<string> = new EventEmitter();

  leftArrow = 'assets/svgs/left-arrow.svg';
  rightArrow = 'assets/svgs/right-arrow.svg';

  slide(position: string) {
    this.slidePositionBtnEvent.emit(position);
  }
}
