import { Component } from '@angular/core';
import { NewsHeaderComponent } from './news-header/news-header.component';
import { NewsBodyComponent } from './news-body/news-body.component';
import { fadingAnimation } from '../../helpers/animations';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [NewsHeaderComponent, NewsBodyComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  animations: [fadingAnimation],
})
export class NewsComponent {}
