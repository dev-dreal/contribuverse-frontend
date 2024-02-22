import { Component, Input } from '@angular/core';
import { LatestBlogsComponent } from './latest-blogs/latest-blogs.component';
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { Apollo } from 'apollo-angular';
import { GET_BLOGS } from '../../../graphql/queries';
import { BlogModel } from '../../../models/blog.model';

@Component({
  selector: 'main-content',
  standalone: true,
  imports: [BlogsListComponent, SearchBarComponent, LatestBlogsComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {
  loading: boolean = true;
  blogs: BlogModel[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs() {
    this.apollo
      .watchQuery({
        query: GET_BLOGS,
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        console.log(data);
        this.blogs = data.blogs;
        this.loading = false;
        if (error) {
          console.error(error);
        }
      });
  }
}
