import { Component } from '@angular/core';
import { GlobalsService } from '../../services/globals/globals.service';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import {
  trigger,
  style,
  transition,
  query,
  group,
  animate,
  state,
} from '@angular/animations';
import { InitialLoaderComponent } from '../../shared/components/initial-loader/initial-loader.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [HeaderComponent, BodyComponent, InitialLoaderComponent],
  providers: [GlobalsService],
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
export class HomeComponent {}
