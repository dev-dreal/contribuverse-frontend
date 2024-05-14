import {
  Component,
  EventEmitter,
  Output,
  computed,
  inject,
} from '@angular/core';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogModel } from '../../../../models/blog.model';
import { CommonModule } from '@angular/common';
import { BlogsService } from '../../../../services/blogs/blogs.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { fadingAnimation } from '../../../../helpers/animations';
import { GlobalsService } from '../../../../services/globals/globals.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'blog-categories',
  standalone: true,
  imports: [NgxSkeletonLoaderModule, CommonModule, BlogCardComponent],
  templateUrl: './blog-categories.component.html',
  styleUrl: './blog-categories.component.scss',
  animations: [fadingAnimation],
})
export class BlogCategoriesComponent {
  @Output() isAddBlogButtonClicked = new EventEmitter<boolean>();
  blogItems = [1, 2, 3, 4];

  // DEPENDENCY INJECTION
  private blogsService = inject(BlogsService);
  private globals = inject(GlobalsService);
  // END OF DEPENDENCY INJECTION

  blogCategories = toSignal(this.blogsService.getBlogCategories(), {
    initialValue: [],
  });
  isBlogsLoading = computed(() => this.blogsService.isBlogCategoriesLoading());

  addBlogMetaData: BlogModel = {
    id: '',
    title: 'Add a new blog',
    shortDescription: 'Add a new blog to the list of blogs.',
    imageUrl: 'assets/gifs/add-blog.gif',
    category: 'Add Blog',
    tags: [],
    comments: [],
    likes: [],
    content: 'Add a new blog to the list of blogs.',
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  navigateToAddBlogPage() {
    this.isAddBlogButtonClicked.emit(true);
    this.globals.router.navigate(['/blogs/add-blog']);
  }
}
