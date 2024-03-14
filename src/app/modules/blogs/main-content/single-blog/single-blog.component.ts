import { Component, Input, WritableSignal, signal } from '@angular/core';
import { BlogAuthorModel, BlogModel } from '../../../../models/blog.model';
import { CommonModule } from '@angular/common';
import { fadingAnimation } from '../../../../helpers/animations';
import { BlogsService } from '../../../../services/blogs/blogs.service';
import { GlobalsService } from '../../../../services/globals/globals.service';
import { FirebaseService } from '../../../../services/auth/firebase.service';
import { AboutBlogComponent } from './about-blog/about-blog.component';
import { MainBlogContentComponent } from './main-blog-content/main-blog-content.component';
import { UsersService } from '../../../../services/users/users.service';
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
  isBlogLoading: WritableSignal<boolean> = signal(true);
  isBlogAuthorLoading: WritableSignal<boolean> = signal(true);
  blogAuthor: BlogAuthorModel = {} as BlogAuthorModel;
  userId: string = '';

  constructor(
    private blogsService: BlogsService,
    private usersService: UsersService,
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
          this.userId = blog.userId;
          this.isBlogLoading.set(false);
          this.loadBlogAuthor(this.userId);
        },
        error: (error) => {
          console.error(error);
          this.globals.toast.error('Blog does not exist');
          this.globals.router.navigate(['/blogs']);
        },
      });
    } else {
      this.globals.toast.error('No blog id provided');
    }
  }

  loadBlogAuthor(userId: string) {
    this.usersService.getUserById(userId).subscribe({
      next: (res) => {
        this.blogAuthor = res;
        this.isBlogAuthorLoading.set(false);
        console.log(this.blogAuthor);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
