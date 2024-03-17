import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { Observable, catchError, from, of, switchMap } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { UsersService } from '../users/users.service';
import { GlobalsService } from '../globals/globals.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firebaseAuth = inject(Auth);
  private usersService = inject(UsersService);
  private globals = inject(GlobalsService);

  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserModel | null | undefined>(undefined);

  loginWithGoogle(): Observable<void> {
    const provider = new GoogleAuthProvider();
    const promise = signInWithPopup(this.firebaseAuth, provider).then((res) => {
      console.log('Google login 1', res);
      console.log('Google login 1', res.user.photoURL);
      this.addUserToDBIfNotExists(
        res.user.displayName!,
        res.user.email!,
        res.user.photoURL!,
      );
      return;
    });
    return from(promise);
  }

  loginWithGitHub(): Observable<void> {
    const provider = new GithubAuthProvider();
    const promise = signInWithPopup(this.firebaseAuth, provider).then((res) => {
      console.log('GitHub login 1', res);
      const result = this.addUserToDBIfNotExists(
        res.user.displayName!,
        res.user.email!,
        res.user.photoURL!,
      );
      return;
    });
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = this.firebaseAuth.signOut();
    return from(promise);
  }

  addUserToDBIfNotExists(name: string, email: string, profileImage: string) {
    return this.usersService
      .createUser(name, email, profileImage)
      .pipe(
        switchMap((user) => {
          console.log('User created', user);
          this.globals.currentUser.set(user);
          return of(user);
        }),
      )
      .subscribe({
        next: (userId) => {
          console.log('User check on DB', userId);
        },
        error: (error) => {
          // console.error('Error checking user on DB', error.message);
          // this.globals.toast.error('Error checking user on DB');
        },
        complete: () => {
          console.log('User check on DB completed');
        },
      });
  }

  // addUserToDBIfNotExists(name: string, email: string, profileImage: string) {
  //   console.log('Add user to DB if not exists', name, email);
  //   // Check if the user exists in the DB, if not, create it
  //   this.usersService.getUserIdByEmail(email).subscribe({
  //     next: (userId) => {
  //       console.log('User check on DB', userId);
  //     },
  //     error: (error) => {
  //       this.usersService.createUser(name, email, profileImage);
  //       console.error('Error checking user on DB', error.message);
  //       // this.globals.toast.error('Error checking user on DB');
  //     },
  //     complete: () => {
  //       console.log('User check on DB completed');
  //     },
  //   });
  // }
}
