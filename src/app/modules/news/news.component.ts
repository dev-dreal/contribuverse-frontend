import { Component, signal } from '@angular/core';
import { NewsHeaderComponent } from './news-header/news-header.component';
import { NewsBodyComponent } from './news-body/news-body.component';
import { fadingAnimation } from '../../helpers/animations';
import { DynamicNavComponent } from './dynamic-nav/dynamic-nav.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [NewsHeaderComponent, NewsBodyComponent, DynamicNavComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  animations: [fadingAnimation],
})
export class NewsComponent {
  currentSlidePosition = signal(0);

  getCurrentSlideStatus(event: number) {
    this.currentSlidePosition.set(event);
  }
}
