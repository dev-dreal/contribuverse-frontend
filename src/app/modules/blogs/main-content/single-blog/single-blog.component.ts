import { Component, Input, WritableSignal, signal } from '@angular/core';
import { BlogModel } from '../../../../models/blog.model';
import { CommonModule } from '@angular/common';
import { fadingAnimation } from '../../../../helpers/animations';
import { BlogsService } from '../../../../services/blogs/blogs.service';
import { GlobalsService } from '../../../../services/globals/globals.service';
import { FirebaseService } from '../../../../services/auth/firebase.service';
import { AboutBlogComponent } from './about-blog/about-blog.component';
import { MainBlogContentComponent } from './main-blog-content/main-blog-content.component';
// import { bubbleCursor, BubbleCursorOptions } from "cursor-effects";

@Component({
  selector: 'single-blog',
  standalone: true,
  imports: [CommonModule, AboutBlogComponent, MainBlogContentComponent],
  templateUrl: './single-blog.component.html',
  styleUrl: './single-blog.component.scss',
  animations: [fadingAnimation],
})
export class SingleBlogComponent {
  @Input() id?: string = '';

  isSingleBlogContentActive: boolean = true;
  blog: BlogModel = {} as BlogModel;
  isLoading: WritableSignal<boolean> = signal(true);

  constructor(
    private blogsService: BlogsService,
    private globals: GlobalsService,
    protected firebaseAuth: FirebaseService,
  ) {}

  ngOnInit(): void {
    this.loadBlog();
  }

  viewAboutBlog(isViewingAboutBlog: boolean) {
    this.isSingleBlogContentActive = !isViewingAboutBlog;
  }

  loadBlog() {
    if (this.id) {
      this.blogsService.getSingleBlog(this.id).subscribe({
        next: (blog) => {
          this.blog = blog;
          this.isLoading.set(false);
          console.log('Single blog, complete', blog);
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.globals.toast.error('No blog id provided');
    }
  }
}
