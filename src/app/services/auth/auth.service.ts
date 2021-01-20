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
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    await this.updateUserData(credential.user);
    return this.router.navigate(['/app']);
  }

  public async facebookSignin() {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    await this.updateUserData(credential.user);
    return this.router.navigate(['/app']);
  }

  public async emailSignin(email, password) {
    const credential = await this.afAuth.signInWithEmailAndPassword(
      email,
      password
    );
    await this.updateUserData(credential.user);
    return this.router.navigate(['/app']);
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
      .createUserWithEmailAndPassword(email, password)
      .then(async (credential) => {
        await this.updateUserData({
          ...credential.user,
          displayName,
        });
        return this.router.navigate(['/app']);
      });
  }
}
