import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthSession, User } from '@supabase/supabase-js';
import {
  Profile,
  SupabaseService,
} from '../../../services/auth/supabase.service';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../avatar/avatar.component';
import { GlobalsService } from '../../../services/globals/globals.service';
import { FirebaseService } from '../../../services/auth/firebase.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, AvatarComponent, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  loading: boolean = false;
  profile: Profile = {} as Profile;
  session: AuthSession | null = null;

  updateProfileForm = this.globals.fb.group({
    username: '',
    website: '',
    avatar_url: '',
  });

  constructor(
    // private readonly supabase: SupabaseService,
    private globals: GlobalsService,
    protected firebaseService: FirebaseService,
  ) {}

  async ngOnInit(): Promise<void> {
    // const { session } = await this.supabase.getSession();
    // this.session = session;
    // await this.getProfile();
    // const { username, website, avatar_url } = this.profile;
    // this.updateProfileForm.patchValue({
    //   username,
    //   website,
    //   avatar_url,
    // });
  }

  get avatarUrl() {
    return this.updateProfileForm.value.avatar_url as string;
  }

  // async updateAvatar(event: string): Promise<void> {
  //   this.updateProfileForm.patchValue({
  //     avatar_url: event,
  //   });
  //   await this.updateProfile();
  // }

  // async getProfile() {
  //   try {
  //     this.loading = true;
  //     const { user } = this.session as { user: User };

  //     const {
  //       data: profile,
  //       error,
  //       status,
  //     } = await this.supabase.profile(user);

  //     if (error && status !== 406) {
  //       throw error;
  //     }

  //     if (profile) {
  //       this.profile = profile;
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       alert(error.message);
  //     }
  //   } finally {
  //     this.loading = false;
  //   }
  // }

  // async updateProfile(): Promise<void> {
  //   try {
  //     this.loading = true;
  //     const { user } = this.session as { user: User };

  //     const username = this.updateProfileForm.value.username as string;
  //     const website = this.updateProfileForm.value.website as string;
  //     const avatar_url = this.updateProfileForm.value.avatar_url as string;

  //     const { error } = await this.supabase.updateProfile({
  //       id: user.id,
  //       username,
  //       website,
  //       avatar_url,
  //     });
  //     if (error) throw error;
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       alert(error.message);
  //     }
  //   } finally {
  //     this.loading = false;
  //   }
  // }

  signOut() {
    this.firebaseService.logout();
    this.globals.router.navigate(['/']);
    // await this.supabase.signOut();
  }
}
