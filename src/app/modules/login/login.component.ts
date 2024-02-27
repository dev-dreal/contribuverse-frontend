import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth0Service } from '../../services/auth/auth0.service';
import { NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, NgxUiLoaderModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  SPINNER = SPINNER;
  constructor(public auth: Auth0Service) {}
}
