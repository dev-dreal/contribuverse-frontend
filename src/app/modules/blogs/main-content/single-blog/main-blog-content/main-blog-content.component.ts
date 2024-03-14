import { Component, Input, WritableSignal, signal } from '@angular/core';
import { BlogModel } from '../../../../../models/blog.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'main-blog-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-blog-content.component.html',
  styleUrl: './main-blog-content.component.scss',
})
export class MainBlogContentComponent {
  @Input({ required: true }) blog!: BlogModel;
  @Input({ required: true }) isLoading: WritableSignal<boolean> = signal(true);
}
