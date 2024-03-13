import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GlobalsService } from '../../../services/globals/globals.service';
import { FirebaseService } from '../../../services/auth/firebase.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  loading: boolean = false;

  constructor(
    private globals: GlobalsService,
    protected readonly firebaseService: FirebaseService,
  ) {}

  async ngOnInit(): Promise<void> {}

  signOut() {
    this.firebaseService.logout();
    this.globals.toast.success('Logged out successfully');
    this.globals.router.navigate(['/home']);
  }
}
