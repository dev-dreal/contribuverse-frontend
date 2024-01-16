import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InitialLoaderComponent } from './shared/components/initial-loader/initial-loader.component';
import { fadingAnimation } from './helpers/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [InitialLoaderComponent, RouterOutlet],
  animations: [fadingAnimation],
})
export class AppComponent {}
