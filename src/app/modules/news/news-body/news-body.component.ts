import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  fadingAnimation,
  slideLeftRightAnimation,
} from '../../../helpers/animations';
import { CoolTechAnimalModel } from '../../../models/coolTechAnimal.model';

@Component({
  selector: 'news-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-body.component.html',
  styleUrl: './news-body.component.scss',
  animations: [fadingAnimation, slideLeftRightAnimation],
})
export class NewsBodyComponent {
  @Input() currentSlidePosition: string = 'left';
  @Output() currentSlidePositionEvent: EventEmitter<string> =
    new EventEmitter();

  coolTechAnimals: CoolTechAnimalModel[] = [
    {
      title: 'Cool Tech Leopard',
      imgUrl: 'assets/svgs/cool-tech-leopard.svg',
    },
    {
      title: 'Cool Tech Lion',
      imgUrl: 'assets/svgs/cool-tech-lion.svg',
    },
    {
      title: 'Cool Tech Dog',
      imgUrl: 'assets/svgs/cool-tech-dog.svg',
    },
  ];

  selectedAnimal = this.coolTechAnimals[0];

  ngOnInit() {
    this.currentSlidePositionEvent.emit(this.currentSlidePosition);
  }

  selectAnimal(index: number) {
    this.currentSlidePosition = this.currentSlidePosition =
      index === 0 ? 'left' : index === 1 ? 'center' : 'right';
    this.currentSlidePositionEvent.emit(this.currentSlidePosition);
  }
}
