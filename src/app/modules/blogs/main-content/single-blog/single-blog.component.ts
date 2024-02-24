import { Component } from '@angular/core';
import { BlogModel } from '../../../../models/blog.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { fadingAnimation } from '../../../../helpers/animations';
import { BlogsService } from '../../../../services/blogs/blogs.service';

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
  id: string = '';
  constructor(
    private route: ActivatedRoute,
    private blogsService: BlogsService,
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.loadBlog();
  }

  loadBlog() {
    this.blogsService.getSingleBlog(this.id).subscribe({
      next: (blog) => {
        this.blog = blog;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
