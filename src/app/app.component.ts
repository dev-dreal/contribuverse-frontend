import { Component, DestroyRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InitialLoaderComponent } from './shared/components/smart/initial-loader/initial-loader.component';
import { fadingAnimation } from './helpers/animations';
import { NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { GlobalsService } from './services/globals/globals.service';
import { FirebaseService } from './services/auth/firebase.service';
import { UsersService } from './services/users/users.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [InitialLoaderComponent, RouterOutlet, NgxUiLoaderModule],
  providers: [GlobalsService],
  animations: [fadingAnimation],
})
export class AppComponent {
  isLoading: boolean = true;
  SPINNER = SPINNER;

  constructor(
    private globals: GlobalsService,
    private firebaseService: FirebaseService,
    private usersService: UsersService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit() {
    this.globals.loader.start();
    this.firebaseService.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          if (user) {
            this.setGlobalUser(user.email!);
          } else {
            this.firebaseService.currentUserSig.set(null);
          }
        },
      });

    setTimeout(() => {
      this.globals.loader.stopAll();
    }, 3000);
  }

  setGlobalUser(email: string) {
    this.usersService.getUserByEmail(email).subscribe({
      next: (user) => {
        this.globals.currentUser.set({
          id: user.id,
          email: user.email,
          name: user.name,
          profileImage: user.profileImage,
          blogs: user.blogs,
          followers: user.followers,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        });
        // console.log('Firebase', this.firebaseService.currentUserSig());
        console.log('Globals', this.globals.currentUser());
      },
      error(err) {
        console.error('Error getting user from DB', err);
      },
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}
