import { Component } from '@angular/core';
import { GlobalsService } from '../../../services/globals/globals.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule],
  providers: [GlobalsService],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
})
export class BodyComponent {}
