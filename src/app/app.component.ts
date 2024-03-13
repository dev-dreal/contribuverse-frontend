import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InitialLoaderComponent } from './shared/components/smart/initial-loader/initial-loader.component';
import { fadingAnimation } from './helpers/animations';
import { NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { GlobalsService } from './services/globals/globals.service';
import { FirebaseService } from './services/auth/firebase.service';
import { UsersService } from './services/users/users.service';
import { catchError, first } from 'rxjs';

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
  ) {}

  ngOnInit() {
    this.globals.loader.start();
    this.firebaseService.user$.subscribe({
      next: (user) => {
        if (user) {
          this.firebaseService.currentUserSig.set({
            email: user.email!,
            username: user.displayName!,
          });
          this.addUserToDBIfNotExists(user.email!, user.displayName!);
        } else {
          this.firebaseService.currentUserSig.set(null);
        }
        console.log(this.firebaseService.currentUserSig());
      },
    });

    setTimeout(() => {
      this.globals.loader.stopAll();
    }, 3000);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  addUserToDBIfNotExists(name: string, email: string) {
    console.log('Add user to DB if not exists', name, email);
    // Check if the user exists in the DB, if not, create it
    this.usersService.getUserIdByEmail(email).subscribe({
      next: (userId) => {},
      error: (error) => {
        this.createUserOnDB(name, email);
        console.error('Error checking user on DB', error.message);
        // this.globals.toast.error('Error checking user on DB');
      },
      complete: () => {
        console.log('User check on DB completed');
      },
    });
  }

  createUserOnDB(name: string, email: string) {
    this.usersService
      .createUser(name, email)
      .pipe(
        catchError((error) => {
          console.error('Error creating user on DB', error);
          // this.globals.toast.error('Error creating user on DB');
          return error;
        }),
      )
      .subscribe({
        next: (data) => {
          console.log('User created on DB', data);
        },
        error: (error) => {
          console.error('Error creating user on DB', error);
          // this.globals.toast.error('Error creating user on DB');
        },
        complete: () => {
          console.log('User creation on DB completed');
        },
      });
  }
}
