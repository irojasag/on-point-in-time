import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afs: AngularFirestore) {}

  public get users$(): Observable<User[]> {
    return this.afs
      .collection<User>('users', (ref) => {
        return ref.orderBy('displayName', 'asc');
      })
      .valueChanges({ idField: 'id' })
      .pipe(
        map((users) => {
          users = users || [];
          return users.map((user) => {
            return {
              ...user,
              methodClass: this.getSignInMethodIcon(user.method),
              photoURL:
                user.photoURL ||
                'https://style.anu.edu.au/_anu/4/images/placeholders/person.png',
            };
          });
        })
      );
  }

  public updateAdminRole(id: string, isAdmin: boolean): Promise<void>{
    return this.afs.doc(`users/${id}`).set({ isAdmin: isAdmin ? false : true },
      { merge: true });
  }

  public updateSuperAdminRole(id: string, isSuperAdmin: boolean): Promise<void> {
    return this.afs.doc(`users/${id}`).set({ isSuperAdmin: isSuperAdmin ? false : true },
      { merge: true });
  }

  public updateUser(id: string, body: any): Promise<void> {
    return this.afs.doc(`users/${id}`).update(body);
  }

  public getSignInMethodIcon(method: string): string {
    switch (method) {
      case 'Google':
        return 'fab fa-google text-google-red';
      case 'Facebook':
        return 'fab fa-facebook text-facebook-blue';
      case 'Email':
        return 'fas fa-at';
      default:
        return '';
    }
  }
}
