import { Component } from '@angular/core';

@Component({
  selector: 'profile-activity',
  standalone: true,
  imports: [],
  templateUrl: './profile-activity.component.html',
  styleUrl: './profile-activity.component.scss',
})
export class ProfileActivityComponent {
  profiles = [
    {
      id: 1,
      name: 'Smiling Classy Lady',
      image: 'assets/svgs/classy.svg',
    },
    {
      id: 2,
      name: 'Smiling Classy Lady',
      image: 'assets/svgs/classy.svg',
    },
    {
      id: 3,
      name: 'Smiling Classy Lady',
      image: 'assets/svgs/classy.svg',
    },
    {
      id: 4,
      name: 'Smiling Classy Lady',
      image: 'assets/svgs/classy.svg',
    },
  ];
}
