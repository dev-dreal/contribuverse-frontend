import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../../../services/auth/supabase.service';
import { GlobalsService } from '../../../services/globals/globals.service';
import { NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, NgxUiLoaderModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  SPINNER = SPINNER;
  registerForm = {} as FormGroup;

  constructor(
    private supabase: SupabaseService,
    private globals: GlobalsService,
  ) {}

  ngOnInit() {
    this.registerForm = this.globals.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });

    this.checkSession();
  }

  async checkSession() {
    const { session } = await this.supabase.getSession();
    if (session) {
      this.globals.toast.info('You are already logged in.');
      this.globals.router.navigate(['/user/profile']);
    }
  }

  async onSubmit() {
    this.globals.loader.start();
    const { data, error } = await this.supabase.register(
      this.registerForm.value.email,
      this.registerForm.value.password,
    );

    if (data && data.user?.aud === 'authenticated') {
      this.globals.loader.stopAll();
      this.globals.toast.success('Check your email for confirmation link.');
      this.globals.router.navigate(['/auth/login']);
    } else if (error) {
      this.globals.loader.stopAll();
      this.globals.toast.error(error.message);
    }
  }

  handleError(controlName: string, errorName: string) {
    const control = this.registerForm.controls[controlName];
    return (control.touched || control.dirty) && control.hasError(errorName);
  }
}
