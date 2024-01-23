import { Component, Input } from '@angular/core';
import { BlogModel } from '../../../../../models/blog.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'blog-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss',
})
export class BlogCardComponent {
  @Input({ required: true }) blog!: BlogModel;
}
