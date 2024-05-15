import {
  Component,
  Input,
  WritableSignal,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
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
  blog = input.required<BlogModel>();
  isLoading = input.required<boolean>();

  // DEPENDENCY INJECTION
  private blogsService = inject(BlogsService);
  private globals = inject(GlobalsService);
  // END OF DEPENDENCY INJECTION

  likesCount = computed(() => this.blog().likes.length);
  isBlogLiked = computed(() => {
    for (let like of this.blog().likes) {
      if (like.userId === this.globals.currentUser()?.id) {
        return true;
      }
    }
    return false;
  });

  // this.blog().likes.forEach((like) => {
  //   if (like.userId === this.globals.currentUser()?.id) {
  //     this.isBlogLiked.update(() => true);
  //   }
  // });

  ngOnInit() {
    console.log('Blog:', this.blog());
  }

  toggleLike(blogId: string, userId: string) {
    if (this.isBlogLiked()) {
      const likeId = this.blog().likes.find((like) => like.userId === userId)
        ?.id as string;

      this.blogsService.deleteLike(likeId).subscribe((res) => {
        console.log('Like deleted:', res);
        // this.likesCount.update((value) => value - 1);
      });
    } else {
      const isAlreadyLiked = this.blog().likes.find(
        (like) => like.userId === userId,
      );

      if (isAlreadyLiked) {
        return;
      }

      this.blogsService.addLike(1, blogId, userId).subscribe((res) => {
        console.log('Like added:', res);
        // this.likesCount.update((value) => value + 1);
      });
    }
    // this.isBlogLiked.update((value) => !value);
  }
}
