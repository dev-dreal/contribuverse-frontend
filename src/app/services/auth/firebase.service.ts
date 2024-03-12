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
import { Observable, from } from 'rxjs';
import { UserInterface } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  register(
    email: string,
    username: string,
    password: string,
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then((response) =>
      updateProfile(response.user, { displayName: username }),
    );

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then(() => {});
    return from(promise);
  }

  loginWithGoogle(): Observable<void> {
    const provider = new GoogleAuthProvider();
    const promise = signInWithPopup(this.firebaseAuth, provider).then(() => {});
    return from(promise);
  }

  loginWithGitHub(): Observable<void> {
    const provider = new GithubAuthProvider();
    const promise = signInWithPopup(this.firebaseAuth, provider).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = this.firebaseAuth.signOut();
    return from(promise);
  }
}
