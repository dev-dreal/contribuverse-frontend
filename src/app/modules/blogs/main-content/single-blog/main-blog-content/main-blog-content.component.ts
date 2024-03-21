import { Component, Input, WritableSignal, signal } from '@angular/core';
import { BlogModel } from '../../../../../models/blog.model';
import { CommonModule } from '@angular/common';
import { BlogsService } from '../../../../../services/blogs/blogs.service';

@Component({
  selector: 'main-blog-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-blog-content.component.html',
  styleUrl: './main-blog-content.component.scss',
})
export class MainBlogContentComponent {
  @Input({ required: true }) blog!: BlogModel;
  @Input({ required: true }) isLoading: WritableSignal<boolean> = signal(true);

  constructor(private blogsService: BlogsService) {}

  isBlogLiked = signal(false);

  ngOnInit() {
    console.log('Blog:', this.blog);
  }

  toggleLike(blogId: string, userId: string) {
    if (this.isBlogLiked()) {
      this.blogsService.deleteLike(blogId).subscribe((res) => {
        console.log('Like deleted:', res);
      });
    } else {
      this.blogsService.addLike(1, blogId, userId).subscribe((res) => {
        console.log('Like added:', res);
      });
    }
    this.isBlogLiked.update((value) => !value);
  }
}
