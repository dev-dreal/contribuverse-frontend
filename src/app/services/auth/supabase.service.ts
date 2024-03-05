import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  RealtimeChannel,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, first, Observable, skipWhile } from 'rxjs';
import { GlobalsService } from '../globals/globals.service';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private _session: AuthSession | null = null;

  private supabase: SupabaseClient;
  // Supabase user state
  private _$user = new BehaviorSubject<User | null | undefined>(undefined);
  $user = this._$user.pipe(
    skipWhile((_) => typeof _ === 'undefined'),
  ) as Observable<User | null>;
  private user_id?: string;

  // Profile state
  private _$profile = new BehaviorSubject<Profile | null | undefined>(
    undefined,
  );
  $profile = this._$profile.pipe(
    skipWhile((_) => typeof _ === 'undefined'),
  ) as Observable<Profile | null>;
  private profile_subscription?: RealtimeChannel;

  constructor(private globals: GlobalsService) {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.key,
    );

    // Initialize Supabase user
    // Get initial user from the current session, if exists
    this.supabase.auth.getUser().then(({ data, error }) => {
      this._$user.next(data && data.user && !error ? data.user : null);

      // After the initial value is set, listen for auth state changes
      this.supabase.auth.onAuthStateChange((event, session) => {
        this._$user.next(session?.user ?? null);
      });
    });

    // Initialize the user's profile
    // The state of the user's profile is dependent on their being a user. If no user is set, there shouldn't be a profile.
    this.$user.subscribe((user) => {
      if (user) {
        // We only make changes if the user is different
        if (user.id !== this.user_id) {
          const user_id = user.id;
          this.user_id = user_id;

          // One-time API call to Supabase to get the user's profile
          this.profile(user).then((res) => {
            // Update our profile BehaviorSubject with the current value
            this._$profile.next(res.data ?? null);

            // Listen to any changes to our user's profile using Supabase Realtime
            this.profile_subscription = this.supabase
              .channel('public:profiles')
              .on(
                'postgres_changes',
                {
                  event: '*',
                  schema: 'public',
                  table: 'profiles',
                  filter: 'user_id=eq.' + user.id,
                },
                (payload: any) => {
                  // Update our profile BehaviorSubject with the newest value
                  this._$profile.next(payload.new);
                },
              )
              .subscribe();
          });
        }
      } else {
        // If there is no user, update the profile BehaviorSubject, delete the user_id, and unsubscribe from Supabase Realtime
        this._$profile.next(null);
        delete this.user_id;
        if (this.profile_subscription) {
          this.supabase.removeChannel(this.profile_subscription).then((res) => {
            console.log(
              'Removed profile channel subscription with status: ',
              res,
            );
          });
        }
      }
    });
  }

  async ngOnInit() {
    await this.getSession();
  }

  async getSession() {
    const { data, error } = await this.supabase.auth.getSession();
    if (error) {
      throw error;
    }
    this._session = data.session;
    return data;
  }

  // get session() {
  //   this.supabase.auth.getSession().then(({ data }) => {
  //     this._session = data.session;
  //     console.log(this._session);
  //   });
  //   return this._session;
  // }

  // get currentUser() {
  //   return this.user.asObservable();
  // }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  // authChanges(
  //   callback: (event: AuthChangeEvent, session: Session | null) => void,
  // ) {
  //   return this.supabase.auth.onAuthStateChange(callback);
  // }

  register(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  async signInWithGithub() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  }

  signInWithPassword(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      // Set _$profile back to undefined. This will mean that $profile will wait to emit a value
      this._$profile.next(undefined);
      this.supabase.auth
        .signInWithPassword({ email, password })
        .then(({ data, error }) => {
          if (error || !data) {
            this.globals.toast.error(
              error?.message ?? 'Invalid email/password combination',
            );
            reject('Invalid email/password combination');
          }

          // Wait for $profile to be set again.
          // We don't want to proceed until our API request for the user's profile has completed
          this.$profile.pipe(first()).subscribe(() => {
            resolve();
          });
        });
    });
  }

  signInWithOtp(email: string) {
    return this.supabase.auth.signInWithOtp({ email });
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      this.globals.toast.error(error.message);
      throw error;
    }
    this.globals.router.navigate(['/']);
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }
}
