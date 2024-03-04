import { Component, EventEmitter, Output } from '@angular/core';
import { GlobalsService } from '../../../services/globals/globals.service';
import { CommonModule } from '@angular/common';
import { NavigationEnd, RouterLink } from '@angular/router';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [GlobalsService],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
})
export class BodyComponent {
  @Output() isGetStartedButtonClicked = new EventEmitter<boolean>();
  constructor(private globals: GlobalsService) {}

  navigateToDashboard() {
    this.isGetStartedButtonClicked.emit(true);
    this.globals.router.navigate(['/user/dashboard']);
  }
}
