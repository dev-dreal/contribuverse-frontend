import { Component, Input, WritableSignal, signal } from '@angular/core';
import { BlogModel } from '../../../../../models/blog.model';
import { CommonModule } from '@angular/common';
import { BlogsService } from '../../../../../services/blogs/blogs.service';
import { GlobalsService } from '../../../../../services/globals/globals.service';

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

  isBlogLiked = signal(false);
  likesCount = signal(0);

  constructor(
    private blogsService: BlogsService,
    private globals: GlobalsService,
  ) {}

  ngOnInit() {
    console.log('Blog:', this.blog);
    this.likesCount.update(() => this.blog.likes.length);

    this.blog.likes.forEach((like) => {
      if (like.userId === this.globals.currentUser()?.id) {
        this.isBlogLiked.update(() => true);
      }
    });
  }

  toggleLike(blogId: string, userId: string) {
    if (this.isBlogLiked()) {
      const likeId = this.blog.likes.find((like) => like.userId === userId)
        ?.id as string;

      this.blogsService.deleteLike(likeId).subscribe((res) => {
        console.log('Like deleted:', res);
        this.likesCount.update((value) => value - 1);
      });
    } else {
      this.blogsService.addLike(1, blogId, userId).subscribe((res) => {
        console.log('Like added:', res);
        this.likesCount.update((value) => value + 1);
      });
    }
    this.isBlogLiked.update((value) => !value);
  }
}
