import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlogsService } from '../../../../services/blogs/blogs.service';
import { RichTextEditorComponent } from '../../../../shared/components/smart/rich-text-editor/rich-text-editor.component';
import { AddBlogModel } from '../../../../models/blog.model';
import { NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { GlobalsService } from '../../../../services/globals/globals.service';
import { SupabaseService } from '../../../../services/auth/supabase.service';
import { first } from 'rxjs';
import { FirebaseService } from '../../../../services/auth/firebase.service';
import { UsersService } from '../../../../services/users/users.service';

@Component({
  selector: 'add-blog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RichTextEditorComponent,
    NgxUiLoaderModule,
  ],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.scss',
})
export class AddBlogComponent {
  SPINNER = SPINNER;
  blogCategories: string[] = [];
  addBlogForm: FormGroup = {} as FormGroup;
  isLoading: boolean = true;
  userId: string = '';

  constructor(
    private blogsService: BlogsService,
    private usersService: UsersService,
    private globals: GlobalsService,
    private firebaseAuth: FirebaseService,
  ) {}

  ngOnInit() {
    this.globals.loader.start();
    this.addBlogForm = this.globals.fb.group({
      category: [null, [Validators.required]],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      userId: ['', [Validators.required]],
    });
    this.blogCategories = this.loadBlogCategories();
    this.getUserByEmail(this.globals.currentUser()?.email!);
  }

  getUserByEmail(email: string) {
    this.usersService
      .getUserIdByEmail(email)
      .pipe()
      .subscribe({
        next: (userId) => {
          console.log('User ID:', userId);
          this.userId = userId;
          this.addBlogForm.patchValue({
            userId: userId,
          });
          this.isLoading = false;
          console.log('Add blog complete');
          this.globals.loader.stopAll();
        },
        error: (error) => {
          console.error(error);
          this.globals.toast.error(error.message);
        },
        complete: () => {},
      });
  }

  get blogContentControl() {
    return this.addBlogForm.controls['content'] as FormControl;
  }

  loadBlogCategories() {
    return this.blogsService.getBlogCategoriesStrings();
  }

  createBlog() {
    this.globals.loader.start();
    console.log(this.addBlogForm.value);

    const newBlog: AddBlogModel = {
      category: this.addBlogForm.value.category!,
      title: this.addBlogForm.value.title!,
      content: this.addBlogForm.value.content!,
      imageUrl: this.addBlogForm.value.imageUrl!,
      userId: this.userId,
    };

    this.blogsService.addBlog(newBlog).subscribe({
      next: (response) => {
        this.globals.toast.success('Blog added successfully');
        this.globals.router.navigate(['/blogs']);
        this.globals.loader.stopAll();
        console.log(response);
      },
      error: (error) => {
        this.globals.toast.error('Failed to add blog');
        this.globals.loader.stopAll();
        console.log(error);
      },
    });
  }

  handleError(controlName: string, errorName: string) {
    const control = this.addBlogForm.controls[controlName];
    return (control.touched || control.dirty) && control.hasError(errorName);
  }
}
