import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../../../services/auth/supabase.service';
import { GlobalsService } from '../../../services/globals/globals.service';
import { fadingAnimation } from '../../../helpers/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [fadingAnimation],
})
export class LoginComponent {
  loginForm = {} as FormGroup;

  constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private globals: GlobalsService,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.supabase
      .signInWithPassword(
        this.loginForm.value.email,
        this.loginForm.value.password,
      )
      .then((res) => {
        console.log(res);
        if (res.data.user?.role === 'authenticated') {
          console.log(window.location.origin);
          this.globals.router.navigate(['/blogs']);
          console.log('authenticated');
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(this.loginForm.value);
  }

  signInWithGitHub() {
    this.supabase
      .signInWithGithub()
      .then((res) => {
        this.globals.router.navigate(['/blogs']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logOut() {
    this.supabase.signOut().then(() => {
      this.globals.router.navigate(['/']);
    });
  }

  handleError(controlName: string, errorName: string) {
    const control = this.loginForm.controls[controlName];
    return (control.touched || control.dirty) && control.hasError(errorName);
  }
}
