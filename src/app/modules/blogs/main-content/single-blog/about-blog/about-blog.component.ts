import { CommonModule } from '@angular/common';
import { Component, Input, WritableSignal, signal } from '@angular/core';

@Component({
  selector: 'about-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-blog.component.html',
  styleUrl: './about-blog.component.scss',
})
export class AboutBlogComponent {
  @Input({ required: true }) blogAuthor: any;
  @Input({ required: true }) isLoading: WritableSignal<boolean> = signal(true);
}
