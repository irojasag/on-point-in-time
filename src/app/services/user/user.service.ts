import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public usersSubject$: BehaviorSubject<User[]>;
  private needToLoadUsers: boolean;

  constructor(private afs: AngularFirestore) {
    this.needToLoadUsers = true;
    this.usersSubject$ = new BehaviorSubject([]);
  }

  public get users$(): Observable<User[]> {
    if (this.needToLoadUsers) {
      this.handleUsersSubscription();
      this.needToLoadUsers = false;
    }
    return this.usersSubject$.asObservable();
  }

  private handleUsersSubscription(): void {
    this.afs
      .collection<User>('users', (ref) => {
        return ref.orderBy('displayName', 'asc');
      })
      .valueChanges({ idField: 'id' })
      .subscribe((users) => {
        this.usersSubject$.next(users);
      });
  }
}
