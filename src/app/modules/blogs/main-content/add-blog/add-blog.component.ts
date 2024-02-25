import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BlogsService } from '../../../../services/blogs/blogs.service';

@Component({
  selector: 'add-blog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.scss',
})
export class AddBlogComponent {
  addBlogForm: FormGroup = {} as FormGroup;

  constructor(
    private blogsService: BlogsService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.addBlogForm = this.fb.group({
      title: [''],
      content: [''],
      category: [''],
      shortDescription: [''],
      coverImage: [''],
      userId: [''],
    });
  }

  createBlog() {
    console.log(this.addBlogForm.value);
    // this.blogsService.addBlog(this.addBlogForm.value).subscribe((res) => {
    //   console.log(res);
    // });
  }
}
