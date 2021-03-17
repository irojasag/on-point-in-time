import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UserUpdateBottomSheetComponent } from '../user-update-bottom-sheet/user-update-bottom-sheet.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users$: Observable<User[]>;

  constructor(public auth: AuthService, 
    private userService: UserService,     
    private bottomSheet: MatBottomSheet) {
    this.users$ = this.userService.users$;
  }

  ngOnInit(): void {}

  public openBottomSheet(userInfo): void {
    this.bottomSheet.open(UserUpdateBottomSheetComponent, {
      data: userInfo,
    });
  }

  
}

