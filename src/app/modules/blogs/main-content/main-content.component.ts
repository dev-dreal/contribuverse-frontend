import { Component, Input } from '@angular/core';
import { LatestBlogsComponent } from './latest-blogs/latest-blogs.component';
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'main-content',
  standalone: true,
  imports: [BlogsListComponent, SearchBarComponent, LatestBlogsComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {
  @Input({ required: true }) blogs: any[] = [];
}
