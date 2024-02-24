import { Component, Input, WritableSignal, signal } from '@angular/core';
import { BlogsService } from '../../../../services/blogs/blogs.service';
import { BlogModel } from '../../../../models/blog.model';
import { CommonModule } from '@angular/common';
import { LatestBlogComponent } from './latest-blog/latest-blog.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'latest-blogs',
  standalone: true,
  imports: [CommonModule, LatestBlogComponent, NgxPaginationModule],
  providers: [BlogsService],
  templateUrl: './latest-blogs.component.html',
  styleUrl: './latest-blogs.component.scss',
})
export class LatestBlogsComponent {
  blogs: WritableSignal<BlogModel[]> = signal([]);
  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: number[] = [3, 6, 9, 12];

  constructor(private blogsService: BlogsService) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs() {
    this.blogsService.getBlogs().subscribe((blogs) => {
      this.blogs.set(blogs);
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.loadBlogs();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.loadBlogs();
  }
}
