import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BlogsService } from '../../../../services/blogs/blogs.service';
import { RichTextEditorComponent } from '../../../../shared/components/smart/rich-text-editor/rich-text-editor.component';

@Component({
  selector: 'add-blog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RichTextEditorComponent],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.scss',
})
export class AddBlogComponent {
  addBlogForm = new FormGroup({
    title: new FormControl(''),
    shortDescription: new FormControl(''),
    content: new FormControl(''),
    category: new FormControl(''),
    imageUrl: new FormControl(''),
    userId: new FormControl(''),
  });

  constructor(private blogsService: BlogsService) {}

  ngOnInit() {}

  createBlog() {
    console.log(this.addBlogForm.value);
    // this.blogsService.addBlog(this.addBlogForm.value).subscribe((res) => {
    //   console.log(res);
    // });
  }
}
