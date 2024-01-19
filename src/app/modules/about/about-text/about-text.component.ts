import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-text',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about-text.component.html',
  styleUrl: './about-text.component.scss',
})
export class AboutTextComponent {}
