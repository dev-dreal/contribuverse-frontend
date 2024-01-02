import { Component } from '@angular/core';
import {
  trigger,
  style,
  transition,
  query,
  group,
  animate,
  state,
} from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(1000, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  loading = true;

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  }
}
