import { Component, Input } from '@angular/core';
import { BlogModel } from '../../../../../models/blog.model';
import { RouterLink } from '@angular/router';
import { GlobalsService } from '../../../../../services/globals/globals.service';

@Component({
  selector: 'latest-blog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './latest-blog.component.html',
  styleUrl: './latest-blog.component.scss',
})
export class LatestBlogComponent {
  @Input({ required: true }) blog!: BlogModel;
  @Input() longDescriptionCutOff: number = 20;

  constructor(private globals: GlobalsService) {}

  getImageResolution = (url: string, width: number, height: number) => {
    return this.globals.getImageResolution(url, width, height);
  };
}
