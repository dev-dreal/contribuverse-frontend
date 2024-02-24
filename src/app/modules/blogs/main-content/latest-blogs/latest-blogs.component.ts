import { Component, Input, WritableSignal, signal } from '@angular/core';
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
  blogs: WritableSignal<BlogModel[]> = signal([]);
  constructor(private blogsService: BlogsService) {}

  ngOnInit(): void {
    this.blogsService.getBlogs().subscribe({
      next: (blogs) => {
        this.blogs.set(blogs);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }
}
