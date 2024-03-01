import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../../../services/auth/supabase.service';
import { GlobalsService } from '../../../services/globals/globals.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm = {} as FormGroup;

  constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private globals: GlobalsService,
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.supabase
      .register(this.registerForm.value.email, this.registerForm.value.password)
      .then((res) => {
        if (res.data.user?.aud === 'authenticated') {
          this.globals.router.navigate(['/auth/login']);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(this.registerForm.value);
  }

  handleError(controlName: string, errorName: string) {
    const control = this.registerForm.controls[controlName];
    return (control.touched || control.dirty) && control.hasError(errorName);
  }
}
