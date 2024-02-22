import { Component, signal } from '@angular/core';
// import { NgxPaginationModule } from 'ngx-pagination';
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
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  loading: boolean = true;
  blogs = signal([]);
  filteredBlogs = signal([]);

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
        this.blogs.set(data.blogs);
        this.filteredBlogs.set(data.blogs);
        this.loading = false;
        if (error) {
          console.error(error);
        }
      });
  }

  // onTableDataChange(event: any) {
  //   this.page = event;
  //   this.loadBlogs();
  // }
  // onTableSizeChange(event: any): void {
  //   this.tableSize = event.target.value;
  //   this.page = 1;
  //   this.loadBlogs();
  // }
}
