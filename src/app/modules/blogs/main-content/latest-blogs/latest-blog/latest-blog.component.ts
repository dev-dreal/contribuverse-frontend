import { Component, Input } from '@angular/core';
import { BlogModel } from '../../../../../models/blog.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'latest-blog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './latest-blog.component.html',
  styleUrl: './latest-blog.component.scss',
})
export class LatestBlogComponent {
  @Input({ required: true }) blog!: BlogModel;
}
