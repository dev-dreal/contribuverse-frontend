import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GlobalsService } from '../../../services/globals/globals.service';
import { fadingAnimation } from '../../../helpers/animations';
import { NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
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

  // onLogin() {
  //   this.globals.loader.start();

  //   this.firebaseService
  //     .login(this.loginForm.value.email, this.loginForm.value.password)
  //     .subscribe({
  //       next: () => {
  //         const redirectUrl =
  //           this.globals.route.snapshot.queryParams['redirect_url'];
  //         if (redirectUrl) {
  //           this.globals.router.navigateByUrl(redirectUrl);
  //         } else {
  //           this.globals.router.navigate(['/user/profile']);
  //         }
  //         this.globals.router.navigate(['/']);
  //         this.globals.toast.success('Login successful!');
  //         this.globals.loader.stopAll();
  //       },
  //       error: (err) => {
  //         console.log(err);
  //         this.globals.loader.stopAll();
  //       },
  //     });
  // }

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
      complete: () => {
        console.log('Logged in with Google!');
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
      complete: () => {
        console.log('Logged in with Github!');
      },
    });
  }

  handleError(controlName: string, errorName: string) {
    const control = this.loginForm.controls[controlName];
    return (control.touched || control.dirty) && control.hasError(errorName);
  }
}
