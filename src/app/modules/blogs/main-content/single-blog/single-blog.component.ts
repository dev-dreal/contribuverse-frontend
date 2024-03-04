import { Component, Input } from '@angular/core';
import { BlogModel } from '../../../../models/blog.model';
import { CommonModule } from '@angular/common';
import { fadingAnimation } from '../../../../helpers/animations';
import { BlogsService } from '../../../../services/blogs/blogs.service';
import { GlobalsService } from '../../../../services/globals/globals.service';

@Component({
  selector: 'single-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-blog.component.html',
  styleUrl: './single-blog.component.scss',
  animations: [fadingAnimation],
})
export class SingleBlogComponent {
  blog: BlogModel = {} as BlogModel;
  @Input() id?: string = '';
  constructor(
    private blogsService: BlogsService,
    private globals: GlobalsService,
  ) {}

  ngOnInit(): void {
    this.loadBlog();
  }

  loadBlog() {
    if (this.id) {
      this.blogsService.getSingleBlog(this.id).subscribe({
        next: (blog) => {
          this.blog = blog;
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
