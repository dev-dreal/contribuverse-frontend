import { Component, signal } from '@angular/core';
import { BlogsService } from '../../../../services/blogs/blogs.service';
import { BlogModel } from '../../../../models/blog.model';
import { CommonModule } from '@angular/common';
import { LatestBlogComponent } from './latest-blog/latest-blog.component';

@Component({
  selector: 'latest-blogs',
  standalone: true,
  imports: [CommonModule, LatestBlogComponent],
  providers: [BlogsService],
  templateUrl: './latest-blogs.component.html',
  styleUrl: './latest-blogs.component.scss',
})
export class LatestBlogsComponent {
  blogs: BlogModel[] = [];
  constructor(private blogsService: BlogsService) {}

  ngOnInit(): void {
    this.blogs = this.blogsService.getBlogs();
  }
}
