import { Component, Input } from '@angular/core';
import { BlogModel } from '../../../../../models/blog.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'blog-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss',
})
export class BlogCardComponent {
  @Input({ required: true }) blog!: BlogModel;
  @Input() isLargeBoxShadow: boolean = true;
}
