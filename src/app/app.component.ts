import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InitialLoaderComponent } from './shared/components/smart/initial-loader/initial-loader.component';
import { fadingAnimation } from './helpers/animations';
import { NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { GlobalsService } from './services/globals/globals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [InitialLoaderComponent, RouterOutlet, NgxUiLoaderModule],
  providers: [GlobalsService],
  animations: [fadingAnimation],
})
export class AppComponent {
  isLoading: boolean = true;
  SPINNER = SPINNER;

  constructor(private globals: GlobalsService) {}

  ngOnInit() {
    this.globals.loader.start();

    setTimeout(() => {
      this.globals.loader.stopAll();
    }, 3000);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}
