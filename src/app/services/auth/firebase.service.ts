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
import { Observable, catchError, from } from 'rxjs';
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
      this.createUserOnDB(
        res.user?.displayName!,
        res.user?.email!,
        res.user?.photoURL!,
      );
      return;
    });
    return from(promise);
  }

  loginWithGitHub(): Observable<void> {
    const provider = new GithubAuthProvider();
    const promise = signInWithPopup(this.firebaseAuth, provider).then((res) => {
      this.createUserOnDB(
        res.user?.displayName!,
        res.user?.email!,
        res.user?.photoURL!,
      );
      return;
    });
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = this.firebaseAuth.signOut();
    return from(promise);
  }

  // addUserToDBIfNotExists(name: string, email: string) {
  //   console.log('Add user to DB if not exists', name, email);
  //   // Check if the user exists in the DB, if not, create it
  //   this.usersService.getUserIdByEmail(email).subscribe({
  //     next: (userId) => {
  //       console.log('User check on DB', userId);
  //     },
  //     error: (error) => {
  //       this.createUserOnDB(name, email);
  //       console.error('Error checking user on DB', error.message);
  //       // this.globals.toast.error('Error checking user on DB');
  //     },
  //     complete: () => {
  //       console.log('User check on DB completed');
  //     },
  //   });
  // }

  createUserOnDB(name: string, email: string, profileImage: string) {
    this.usersService
      .createUser(name, email, profileImage)
      .pipe(
        catchError((error) => {
          console.error('Error creating user on DB', error);
          this.globals.toast.error('Error creating user on DB');
          return error;
        }),
      )
      .subscribe({
        next: (response: unknown) => {
          let data = response as UserModel;
          console.log('User created on DB', data);
          this.globals.currentUser.set({
            id: data.id,
            email: data.email,
            name: data.name,
            profileImage: data.profileImage,
            blogs: data.blogs,
            followers: data.followers,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
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
