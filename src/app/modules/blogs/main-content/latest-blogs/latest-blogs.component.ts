import {
  Component,
  DestroyRef,
  WritableSignal,
  signal,
  HostListener,
  effect,
} from '@angular/core';
import { BlogsService } from '../../../../services/blogs/blogs.service';
import { BlogModel } from '../../../../models/blog.model';
import { CommonModule } from '@angular/common';
import { LatestBlogComponent } from './latest-blog/latest-blog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { fadingAnimation } from '../../../../helpers/animations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UsersService } from '../../../../services/users/users.service';
import { UserModel } from '../../../../models/user.model';

@Component({
  selector: 'latest-blogs',
  standalone: true,
  imports: [
    CommonModule,
    LatestBlogComponent,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [BlogsService],
  templateUrl: './latest-blogs.component.html',
  styleUrl: './latest-blogs.component.scss',
  animations: [fadingAnimation],
})
export class LatestBlogsComponent {
  blogAuthor!: UserModel;
  isBlogsLoading = signal(true);
  isMobileView = signal(false);
  blogItems = [1, 2];
  blogs: WritableSignal<BlogModel[]> = signal([]);
  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: number[] = [3, 6, 9, 12];

  constructor(
    private blogsService: BlogsService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  ngAfterViewInit(): void {
    if (window.innerWidth <= 1200) {
      this.tableSize = 1;
    } else {
      this.tableSize = 2;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustTableSizeOnResize(event);
  }

  adjustTableSizeOnResize(event: Event): void {
    const window = event.target as Window;
    if (window.innerWidth <= 1200 && this.tableSize > 1) {
      this.tableSize = 1;
    } else if (window.innerWidth > 1200 && this.tableSize < 2) {
      this.tableSize = 2;
    }
  }

  loadBlogs(): void {
    this.blogsService
      .getBlogs()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (blogs: BlogModel[]) => {
          this.blogs.set(blogs);
          this.isBlogsLoading.set(false);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  onTableDataChange(pageChange: number) {
    this.page = pageChange;
    this.loadBlogs();
  }
}
