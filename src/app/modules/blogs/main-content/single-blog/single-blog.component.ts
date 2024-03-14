import { Component, Input, WritableSignal, signal } from '@angular/core';
import { BlogModel } from '../../../../models/blog.model';
import { CommonModule } from '@angular/common';
import { fadingAnimation } from '../../../../helpers/animations';
import { BlogsService } from '../../../../services/blogs/blogs.service';
import { GlobalsService } from '../../../../services/globals/globals.service';
import { FirebaseService } from '../../../../services/auth/firebase.service';
import { AboutBlogComponent } from './about-blog/about-blog.component';
import { MainBlogContentComponent } from './main-blog-content/main-blog-content.component';
import { UsersService } from '../../../../services/users/users.service';
import { UserModel } from '../../../../models/user.model';
import { NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';

// import { bubbleCursor, BubbleCursorOptions } from "cursor-effects";

@Component({
  selector: 'single-blog',
  standalone: true,
  imports: [
    CommonModule,
    AboutBlogComponent,
    MainBlogContentComponent,
    NgxUiLoaderModule,
  ],
  templateUrl: './single-blog.component.html',
  styleUrl: './single-blog.component.scss',
  animations: [fadingAnimation],
})
export class SingleBlogComponent {
  @Input() id?: string = '';

  SPINNER = SPINNER;

  isSingleBlogContentActive: boolean = true;
  blog: BlogModel = {} as BlogModel;
  isBlogLoading: WritableSignal<boolean> = signal(true);
  isBlogAuthorLoading: WritableSignal<boolean> = signal(true);
  blogAuthor: UserModel = {} as UserModel;
  userId: string = '';

  constructor(
    private blogsService: BlogsService,
    private usersService: UsersService,
    private globals: GlobalsService,
    protected firebaseAuth: FirebaseService,
  ) {}

  ngOnInit(): void {
    this.globals.loader.start();
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
        this.globals.loader.stopAll();
        console.log('BLOG AUTHOR', this.blogAuthor);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }
}
