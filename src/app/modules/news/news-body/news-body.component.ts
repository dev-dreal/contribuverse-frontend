import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { circularMotion, fadingAnimation } from '../../../helpers/animations';
import { CoolTechAnimalModel } from '../../../models/coolTechAnimal.model';
import { GlobalsService } from '../../../services/globals/globals.service';

@Component({
  selector: 'news-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-body.component.html',
  styleUrl: './news-body.component.scss',
  animations: [fadingAnimation, circularMotion],
})
export class NewsBodyComponent {
  @Input() activeSlideIndex: number = 0;
  @Output() currentSlidePositionEvent: EventEmitter<number> =
    new EventEmitter();

  coolTechAnimals: CoolTechAnimalModel[] = [
    {
      title: 'Cool Tech Leopard',
      imgUrl: 'assets/svgs/cool-tech-leopard.svg',
      state: 'top',
    },
    {
      title: 'Cool Tech Lion',
      imgUrl: 'assets/svgs/cool-tech-lion.svg',
      state: 'center',
    },
    {
      title: 'Cool Tech Dog',
      imgUrl: 'assets/svgs/cool-tech-dog.svg',
      state: 'bottom',
    },
  ];

  selectedAnimal = this.coolTechAnimals[0];

  constructor(private globals: GlobalsService) {}

  ngOnInit() {
    this.currentSlidePositionEvent.emit(this.activeSlideIndex);
  }

  selectAnimal(index: number) {
    this.activeSlideIndex = index;
    this.currentSlidePositionEvent.emit(index);
  }

  isTopOrBottom(index: number): string {
    if ((index + 1) % this.coolTechAnimals.length === this.activeSlideIndex) {
      return 'top';
    } else if (
      (this.activeSlideIndex + 1) % this.coolTechAnimals.length ===
      index
    ) {
      return 'bottom';
    }

    return 'center';
  }
}