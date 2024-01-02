import { Component } from '@angular/core';
import { GlobalsService } from '../../../services/globals/globals.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-initial-loader',
  standalone: true,
  imports: [CommonModule],
  providers: [GlobalsService],
  templateUrl: './initial-loader.component.html',
  styleUrl: './initial-loader.component.scss',
})
export class InitialLoaderComponent {
  imgUrl =
    'https://res.cloudinary.com/dv765kdgq/image/upload/v1703347692/contri-logo_mxrjbe.png';

  constructor(private globals: GlobalsService) {}

  ngOnInit(): void {
    this.imgUrl = this.globals.getImageResolution(this.imgUrl, 500, 600);
  }
}
