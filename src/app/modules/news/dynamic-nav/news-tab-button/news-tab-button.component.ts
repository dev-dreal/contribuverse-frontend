import { Component, Input, input } from '@angular/core';
import { longerFadingAnimation } from '../../../../helpers/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'news-tab-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-tab-button.component.html',
  styleUrl: './news-tab-button.component.scss',
  animations: [longerFadingAnimation],
})
export class NewsTabButtonComponent {
  label = input<string>('');
  imageUrl = input<string>('');
  altText = input<string>('');
  isLabelLeft = input<boolean>(true);

  isHeaderNavLinkClicked: boolean = false;
}
