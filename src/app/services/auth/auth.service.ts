import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';

import { User } from '../../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import 'firebase/analytics';
const analytics = firebase.analytics;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs
            .doc<User>(`users/${user.uid}`)
            .valueChanges()
            .pipe(
              map((userDoc) => {
                return {
                  ...userDoc,
                  createdDate: userDoc.createdAt
                    ? userDoc.createdAt.toDate()
                    : null,
                  birthDate: userDoc.birthDateAt
                    ? userDoc.birthDateAt.toDate()
                    : null,
                };
              })
            );
        } else {
          return of(null);
        }
      })
    );
  }

  public async googleSignin() {
    this.afAuth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        const provider = new auth.GoogleAuthProvider();
        const credential = await this.afAuth.signInWithPopup(provider);
        await this.updateUserData({ ...credential.user, method: 'Google' });
        analytics().logEvent('login', {
          method: 'Google',
        });
        return this.router.navigate(['/app']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  }

  public async facebookSignin() {
    this.afAuth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        const provider = new auth.FacebookAuthProvider();
        const credential = await this.afAuth.signInWithPopup(provider);
        await this.updateUserData({ ...credential.user, method: 'Facebook' });
        analytics().logEvent('login', {
          method: 'Facebook',
        });
        return this.router.navigate(['/app']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  }

  public async emailSignin(email, password) {
    this.afAuth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        const credential = await this.afAuth.signInWithEmailAndPassword(
          email,
          password
        );
        await this.updateUserData({ ...credential.user, method: 'Email' });
        analytics().logEvent('login', {
          method: 'Email',
        });
        return this.router.navigate(['/app']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  }

  public async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  private async updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data = {
      uid: user.uid,
      email: user.email,
      method: user.method,
    };

    try {
      return await userRef.update(data);
    } catch (err) {
      if (String(err).includes('No document to update')) {
        return await userRef.set(
          {
            ...data,
            displayName: user.displayName || '',
            photoURL:
              user.photoURL ||
              'https://style.anu.edu.au/_anu/4/images/placeholders/person.png',
            createdAt: new Date() as any,
            locked: false,
          },
          { merge: true }
        );
      }
      console.log('error', err);
    }
  }

  public async createUserWithEmailAndPassword(
    email: string,
    password: string,
    displayName: string
  ) {
    this.afAuth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        this.afAuth
          .createUserWithEmailAndPassword(email, password)
          .then(async (credential) => {
            await this.updateUserData({
              ...credential.user,
              displayName,
              method: 'Email',
            });
            analytics().logEvent('sign_up', {
              method: 'Create User',
            });
            return this.router.navigate(['/app']);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  }

  public async sendForgotPasswordEmail(email: string) {
    await this.afAuth.sendPasswordResetEmail(email);
  }
}
