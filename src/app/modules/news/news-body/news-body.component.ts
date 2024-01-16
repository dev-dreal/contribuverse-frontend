import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { fadingAnimation } from '../../../helpers/animations';
import { CoolTechAnimalModel } from '../../../models/coolTechAnimal.model';

@Component({
  selector: 'news-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-body.component.html',
  styleUrl: './news-body.component.scss',
  animations: [fadingAnimation],
})
export class NewsBodyComponent {
  coolTechAnimals = [
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

  selectAnimal(animal: CoolTechAnimalModel) {
    this.selectedAnimal = animal;
  }
}
