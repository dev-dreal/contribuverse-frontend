import { Component, Input } from '@angular/core';
import { longerFadingAnimation } from '../../../../helpers/animations';

@Component({
  selector: 'news-tab-button',
  standalone: true,
  imports: [],
  templateUrl: './news-tab-button.component.html',
  styleUrl: './news-tab-button.component.scss',
  animations: [longerFadingAnimation],
})
export class NewsTabButtonComponent {
  @Input() label: string = '';
  @Input() imageUrl: string = '';
  @Input() altText: string = '';
}
