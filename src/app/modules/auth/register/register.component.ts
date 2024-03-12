import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../../../services/auth/supabase.service';
import { GlobalsService } from '../../../services/globals/globals.service';
import { NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { fadingAnimation } from '../../../helpers/animations';
import { UsersService } from '../../../services/users/users.service';
import { catchError } from 'rxjs';
import { CreateUserModel } from '../../../models/user.model';
import { FirebaseService } from '../../../services/auth/firebase.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, NgxUiLoaderModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: [fadingAnimation],
})
export class RegisterComponent {
  SPINNER = SPINNER;
  registerForm = {} as FormGroup;

  constructor(
    private supabase: SupabaseService,
    private globals: GlobalsService,
    private usersService: UsersService,
    private firebaseService: FirebaseService,
  ) {}

  ngOnInit() {
    this.registerForm = this.globals.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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

    this.firebaseService
      .register(
        this.registerForm.value.email,
        this.registerForm.value.username,
        this.registerForm.value.password,
      )
      .subscribe({
        next: (response) => {
          console.log('User created on Firebase', response);
        },
        error: (error) => {
          console.error('Error creating user', error);
          this.globals.toast.error('Error creating user');
        },
        complete: () => {
          this.globals.toast.success(
            'User created successfully! Please proceed to login.',
          );
          console.log('User created successfully! Please proceed to login.');
          this.globals.router.navigate(['/auth/login']);
          this.globals.loader.stopAll();
        },
      });
    // const { data, error } = await this.supabase.register(
    //   this.registerForm.value.email,
    //   this.registerForm.value.password,
    // );

    // this.createUserOnDB(
    //   this.registerForm.value.username,
    //   this.registerForm.value.email,
    // );

    // if (data && data.user?.aud === 'authenticated') {
    //   this.globals.loader.stopAll();
    //   this.globals.toast.success('Check your email for confirmation link.');
    //   this.globals.router.navigate(['/auth/login']);
    // } else if (error) {
    //   this.globals.loader.stopAll();
    //   this.globals.toast.error(error.message);
    // }
  }

  createUserOnDB(name: string, email: string) {
    this.usersService
      .createUser(name, email)
      .pipe(
        catchError((error) => {
          console.error('Error creating user on DB', error);
          this.globals.toast.error('Error creating user on DB');
          return error;
        }),
      )
      .subscribe({
        next: (data) => {
          console.log('User created on DB', data);
        },
        error: (error) => {
          console.error('Error creating user on DB', error);
          this.globals.toast.error('Error creating user on DB');
        },
        complete: () => {
          console.log('User creation on DB completed');
        },
      });
  }

  handleError(controlName: string, errorName: string) {
    const control = this.registerForm.controls[controlName];
    return (control.touched || control.dirty) && control.hasError(errorName);
  }
}
