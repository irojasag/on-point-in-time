import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users$: Observable<User[]>;
  constructor(public auth: AuthService, private afs: AngularFirestore) {
    this.users$ = this.afs
      .collection<User>('users', (ref) => {
        return ref.orderBy('displayName', 'asc');
      })
      .valueChanges({ idField: 'id' });
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

  ngOnInit(): void {}
}
