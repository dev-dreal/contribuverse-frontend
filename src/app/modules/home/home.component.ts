import { Component } from '@angular/core';
import { GlobalsService } from '../../services/globals/globals.service';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { fadingAnimation } from '../../helpers/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [HeaderComponent, BodyComponent],
  providers: [GlobalsService],
  animations: [fadingAnimation],
})
export class HomeComponent {}
