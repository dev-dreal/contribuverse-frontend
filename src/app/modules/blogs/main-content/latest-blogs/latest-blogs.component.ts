import {
  Component,
  signal,
  HostListener,
  inject,
  computed,
} from '@angular/core';
import { BlogsService } from '../../../../services/blogs/blogs.service';
import { BlogModel } from '../../../../models/blog.model';
import { CommonModule } from '@angular/common';
import { LatestBlogComponent } from './latest-blog/latest-blog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { fadingAnimation } from '../../../../helpers/animations';
import { toSignal } from '@angular/core/rxjs-interop';
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
  isMobileView = signal(false);
  blogItems = [1, 2];
  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: number[] = [3, 6, 9, 12];

  // DEPENDENCY INJECTION
  private blogsService = inject(BlogsService);
  // END OF DEPENDENCY INJECTION
  blogs = toSignal(this.blogsService.getBlogs(), { initialValue: [] });
  isBlogsLoading = computed(() => this.blogsService.isBlogsLoading());

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

  onTableDataChange(pageChange: number) {
    this.page = pageChange;
  }
}
