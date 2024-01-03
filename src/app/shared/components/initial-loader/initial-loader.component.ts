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
  txt = 'CONTRIBUVERSE'; /* The text */
  speed = 150;
  title = '';
  imgUrl =
    'https://res.cloudinary.com/dv765kdgq/image/upload/v1704307134/contrilogo_ptxsoh.svg';

  constructor(private globals: GlobalsService) {}

  ngOnInit(): void {
    this.imgUrl = this.globals.getImageResolution(this.imgUrl, 500, 600);

    this.typeWriter();
  }

  typeWriter() {
    for (let i = 0; i < this.txt.length; i++) {
      setTimeout(() => {
        this.title += this.txt[i];
      }, this.speed * i);
    }
  }
}
