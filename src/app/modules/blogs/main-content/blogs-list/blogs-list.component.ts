import {
  Component,
  EventEmitter,
  Output,
  WritableSignal,
  signal,
} from '@angular/core';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogModel } from '../../../../models/blog.model';
import { CommonModule } from '@angular/common';
import { BlogsService } from '../../../../services/blogs/blogs.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { fadingAnimation } from '../../../../helpers/animations';
import { GlobalsService } from '../../../../services/globals/globals.service';

@Component({
  selector: 'blogs-list',
  standalone: true,
  imports: [NgxSkeletonLoaderModule, CommonModule, BlogCardComponent],
  templateUrl: './blogs-list.component.html',
  styleUrl: './blogs-list.component.scss',
  animations: [fadingAnimation],
})
export class BlogsListComponent {
  @Output() isAddBlogButtonClicked = new EventEmitter<boolean>();
  blogs: WritableSignal<BlogModel[]> = signal([]);
  isBlogsLoading = signal(true);
  blogItems = [1, 2, 3, 4];

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
  constructor(
    private blogsService: BlogsService,
    private globals: GlobalsService,
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  navigateToAddBlogPage() {
    this.isAddBlogButtonClicked.emit(true);
    this.globals.router.navigate(['/blogs/add-blog']);
  }

  loadBlogs() {
    this.blogs.set(this.blogsService.getBlogCategories());
    setTimeout(() => {
      this.isBlogsLoading.set(false);
    }, 1000);
  }
}
