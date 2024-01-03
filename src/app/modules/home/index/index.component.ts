import { Component } from '@angular/core';
import { GlobalsService } from '../../../services/globals/globals.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  imgUrl: string = '';
  constructor(private globals: GlobalsService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.imgUrl = this.globals.getImageResolution(
      'https://res.cloudinary.com/dv765kdgq/image/upload/v1704307134/contrilogo_ptxsoh.svg',
      500,
      600
    );
  }
}
