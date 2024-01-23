import { Component, WritableSignal, signal } from '@angular/core';
import { SidebarMenuItemComponent } from '../../../../shared/components/ui/sidebar-menu-item/sidebar-menu-item.component';
import { ShrinkNumberPipe } from '../../../../shared/pipes/shrink-number.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'profile-activity',
  standalone: true,
  imports: [CommonModule, SidebarMenuItemComponent, ShrinkNumberPipe],
  templateUrl: './profile-activity.component.html',
  styleUrl: './profile-activity.component.scss',
})
export class ProfileActivityComponent {
  followers: WritableSignal<number> = signal(24300);

  profiles = [
    {
      id: 1,
      name: 'Smiling Classy Lady',
      image: 'assets/svgs/classy.svg',
    },
    {
      id: 2,
      name: 'Young boy in Black Jacket',
      image: 'assets/svgs/boy-in-jacket.svg',
    },
    {
      id: 3,
      name: 'Smiling Girl in Black Hat',
      image: 'assets/svgs/smiling-girl-in-hat.svg',
    },
    {
      id: 4,
      name: 'Cute Boy',
      image: 'assets/svgs/cute-boy.svg',
    },
    {
      id: 5,
      name: 'Gamer Boy',
      image: 'assets/svgs/gamer-boy.svg',
    },
  ];
}
