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
          console.log('MAP USERS');
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
