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
import { NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { AuthSession } from '@supabase/supabase-js';
import { FirebaseService } from '../../../services/auth/firebase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, NgxUiLoaderModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [fadingAnimation],
})
export class LoginComponent {
  SPINNER = SPINNER;
  loginForm = {} as FormGroup;

  constructor(
    private supabase: SupabaseService,
    private globals: GlobalsService,
    private firebaseService: FirebaseService,
  ) {}

  ngOnInit() {
    this.loginForm = this.globals.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.checkSession();
  }

  async checkSession() {
    // const { session } = await this.supabase.getSession();
    if (this.firebaseService.currentUserSig()) {
      this.globals.toast.info('You are already logged in.');
      const redirectUrl =
        this.globals.route.snapshot.queryParams['redirect_url'];
      if (redirectUrl) {
        this.globals.router.navigateByUrl(redirectUrl);
      } else {
        this.globals.router.navigate(['/user/profile']);
      }
    }
  }

  onLogin() {
    this.globals.loader.start();

    this.firebaseService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: () => {
          const redirectUrl =
            this.globals.route.snapshot.queryParams['redirect_url'];
          if (redirectUrl) {
            this.globals.router.navigateByUrl(redirectUrl);
          } else {
            this.globals.router.navigate(['/user/profile']);
          }
          this.globals.router.navigate(['/']);
          this.globals.toast.success('Login successful!');
          this.globals.loader.stopAll();
        },
        error: (err) => {
          console.log(err);
          this.globals.loader.stopAll();
        },
      });

    // this.supabase
    //   .signInWithPassword(
    //     this.loginForm.value.email,
    //     this.loginForm.value.password,
    //   )
    //   .then((res) => {
    //     // Redirect to a specific page after successful login
    //     const redirectUrl =
    //       this.globals.route.snapshot.queryParams['redirect_url'];
    //     if (redirectUrl) {
    //       this.globals.router.navigateByUrl(redirectUrl);
    //     } else {
    //       // Redirect to a default route or specific page if no redirect URL is provided
    //       this.globals.router.navigate(['/user/profile']);
    //     }
    //     this.globals.toast.success('Login successful!');
    //     this.globals.loader.stopAll();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     this.globals.loader.stopAll();
    //   });
  }

  loginWithGoogle() {
    this.firebaseService.loginWithGoogle().subscribe({
      next: () => {
        const redirectUrl =
          this.globals.route.snapshot.queryParams['redirect_url'];
        if (redirectUrl) {
          this.globals.router.navigateByUrl(redirectUrl);
        } else {
          this.globals.router.navigate(['/user/profile']);
        }
        this.globals.toast.success('Login successful!');
        this.globals.loader.stopAll();
      },
      error: (err) => {
        console.log(err);
        this.globals.loader.stopAll();
      },
    });
  }

  loginWithGithub() {
    this.firebaseService.loginWithGitHub().subscribe({
      next: () => {
        const redirectUrl =
          this.globals.route.snapshot.queryParams['redirect_url'];
        if (redirectUrl) {
          this.globals.router.navigateByUrl(redirectUrl);
        } else {
          this.globals.router.navigate(['/user/profile']);
        }
        this.globals.toast.success('Login successful!');
        this.globals.loader.stopAll();
      },
      error: (err) => {
        console.log(err);
        this.globals.loader.stopAll();
      },
    });
  }

  async signInWithGitHub() {
    await this.supabase.signInWithGithub();
  }

  logOut() {
    this.globals.loader.start();
    this.supabase
      .signOut()
      .then(() => {
        this.globals.toast.success('You have been logged out.');
        this.globals.loader.stopAll();
        this.globals.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);
        this.globals.loader.stopAll();
      });
  }

  handleError(controlName: string, errorName: string) {
    const control = this.loginForm.controls[controlName];
    return (control.touched || control.dirty) && control.hasError(errorName);
  }
}
