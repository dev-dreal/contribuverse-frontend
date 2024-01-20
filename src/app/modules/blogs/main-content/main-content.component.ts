import { Component } from '@angular/core';
import { LatestBlogsComponent } from './latest-blogs/latest-blogs.component';
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { SearchBlogsComponent } from './search-blogs/search-blogs.component';

@Component({
  selector: 'main-content',
  standalone: true,
  imports: [BlogsListComponent, SearchBlogsComponent, LatestBlogsComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {}
