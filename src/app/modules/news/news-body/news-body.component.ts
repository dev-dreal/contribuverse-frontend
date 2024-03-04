import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { circularMotion, fadingAnimation } from '../../../helpers/animations';
import { CoolTechAnimalModel } from '../../../models/coolTechAnimal.model';
import { GlobalsService } from '../../../services/globals/globals.service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MenuMobileComponent } from '../../../shared/components/ui/menu-mobile/menu-mobile.component';
import { SidebarMenuItemComponent } from '../../../shared/components/ui/sidebar-menu-item/sidebar-menu-item.component';

@Component({
  selector: 'news-body',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MenuMobileComponent,
    RouterLink,
    SidebarMenuItemComponent,
  ],
  providers: [GlobalsService],
  templateUrl: './news-body.component.html',
  styleUrl: './news-body.component.scss',
  animations: [fadingAnimation, circularMotion],
})
export class NewsBodyComponent {
  @Input() activeSlideIndex: WritableSignal<number> = signal(0);
  @Output() currentSlidePositionEvent: EventEmitter<number> =
    new EventEmitter();
  @Output() isMenuOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  isHamburgerMenuOpen = false;

  coolTechAnimals: CoolTechAnimalModel[] = [
    {
      title: 'Cool Tech Leopard',
      route: 'news/robotics',
      imgUrl:
        'https://res.cloudinary.com/dv765kdgq/image/upload/v1705701240/cool-leopard_kiqkep.png',
      svgUrl: 'assets/svgs/cool-tech-leopard.svg',
      state: 'top',
    },
    {
      title: 'Cool Tech Lion',
      route: 'news/metaverse',
      imgUrl:
        'https://res.cloudinary.com/dv765kdgq/image/upload/v1705701240/cool-lion_dnyxmr.png',
      svgUrl: 'assets/svgs/cool-tech-lion.svg',
      state: 'center',
    },
    {
      title: 'Cool Tech Dog',
      route: 'news/gaming',
      imgUrl:
        'https://res.cloudinary.com/dv765kdgq/image/upload/v1705701240/cool-dog_uxpho4.png',
      svgUrl: 'assets/svgs/cool-tech-dog.svg',
      state: 'bottom',
    },
    {
      title: 'Cool Tech Horse',
      route: 'news/movies',
      imgUrl:
        'https://res.cloudinary.com/dv765kdgq/image/upload/v1709583749/cool-tech-horse_brodrx.png',
      svgUrl: 'assets/svgs/cool-tech-horse.svg',
      state: 'bottom',
    },
  ];

  selectedAnimal = this.coolTechAnimals[0];

  constructor(private globals: GlobalsService) {
    /* The `effect(() => { ... });` block in the `NewsBodyComponent` class is creating a side effect
    that will be triggered whenever the value of `activeSlideIndex` changes. */
    // When the active slide index changes, update the selected animal and navigate to the selected animal's route.
    effect(() => {
      this.selectedAnimal = this.coolTechAnimals[this.activeSlideIndex()];
      this.globals.router.navigate([this.selectedAnimal.route]);
    });
  }

  ngOnInit() {
    this.currentSlidePositionEvent.emit(this.activeSlideIndex());
  }

  showComingSoonAlert() {
    this.globals.toast.info('Feature coming soon!');
  }

  openMenu() {
    this.isHamburgerMenuOpen = true;
  }

  closeMenu() {
    this.isHamburgerMenuOpen = false;
  }

  selectAnimal(index: number) {
    this.activeSlideIndex.set(index);
    this.currentSlidePositionEvent.emit(index);
  }

  isTopOrBottom(index: number): string {
    const numItems = this.coolTechAnimals.length;
    const activeIndex = this.activeSlideIndex();
    if (index === activeIndex) {
      return 'center';
    } else if ((index + 1) % numItems === activeIndex % numItems) {
      return 'top';
    } else {
      return 'bottom';
    }
  }

  getImageResolution(url: string, width: number, height: number): string {
    return this.globals.getImageResolution(url, width, height);
  }
}
