import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UserUpdateBottomSheetComponent } from '../user-update-bottom-sheet/user-update-bottom-sheet.component';
import { UserService } from 'src/app/services/user/user.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users$: Observable<User[]>;
  public filteredUsers: User[];
  public users: User[];
  public filterValue: FormControl;


  constructor(public auth: AuthService, 
    private userService: UserService,     
    private bottomSheet: MatBottomSheet) {
    this.users$ = this.userService.users$;
    this.filterValue = new FormControl();
  }

  ngOnInit(): void {
    this.users$.subscribe(users => {
      this.users = users;
      this.restoreFilteredUsers();
    });
  }

  public openBottomSheet(userInfo): void {
    this.bottomSheet.open(UserUpdateBottomSheetComponent, {
      data: userInfo,
    });
  }

  private restoreFilteredUsers() {
    this.filteredUsers = this.users;
  }

  public filterUser(): void {
    if(this.filterValue.value === "") {
      this.restoreFilteredUsers();
    } 
    else {
      this.filteredUsers = this.users.filter(item => item.displayName.toLowerCase().includes(this.filterValue.value.toLowerCase()));
    }
  }

}

