import { Component } from '@angular/core';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogModel } from '../../../../models/blog.model';
import { CommonModule } from '@angular/common';
import { BlogsService } from '../../../../services/blogs/blogs.service';

@Component({
  selector: 'blogs-list',
  standalone: true,
  imports: [CommonModule, BlogCardComponent],
  templateUrl: './blogs-list.component.html',
  styleUrl: './blogs-list.component.scss',
})
export class BlogsListComponent {
  addBlogMetaData = {
    title: 'Add a new blog',
    shortDescription: 'Add a new blog to the list of blogs.',
    image: 'assets/gifs/add-blog.gif',
    route: 'add',
  };

  blogs: BlogModel[] = [];

  constructor(private blogsService: BlogsService) {}

  ngOnInit(): void {
    this.blogs = this.blogsService.getBlogs();
  }
}
