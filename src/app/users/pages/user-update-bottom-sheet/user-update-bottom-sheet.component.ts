import { Component, OnInit, Inject } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { ContactInfo } from 'src/app/models/contact-info.model ';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-update-bottom-sheet',
  templateUrl: './user-update-bottom-sheet.component.html',
  styleUrls: ['./user-update-bottom-sheet.component.scss'],
})
export class UserUpdateBottomSheetComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<UserUpdateBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: User,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}
  ngOnInit(): void {}

  public openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
  }

  updateLock(event: MouseEvent, data: any): void {
    this.userService.updateLock(data.uid, data.locked).then(() => {
      this.bottomSheetRef.dismiss();
      this.snackBar.open(`Se actualizó a ${data.displayName}`, '', {
        duration: 2000,
      });
    });
    event.preventDefault();
  }

  updateAdminRole(event: MouseEvent, data: any): void {
    this.userService.updateAdminRole(data.uid, data.isAdmin).then(() => {
      this.bottomSheetRef.dismiss();
      this.snackBar.open(
        `Se actualizo el rol Admin de ${data.displayName}`,
        '',
        {
          duration: 2000,
        }
      );
    });
    event.preventDefault();
  }

  updateSuperAdminRole(event: MouseEvent, data: any): void {
    this.userService
      .updateSuperAdminRole(data.uid, data.isSuperAdmin)
      .then(() => {
        this.bottomSheetRef.dismiss();
        this.snackBar.open(
          `Se actualizo el rol Super Admin de ${data.displayName}`,
          '',
          {
            duration: 2000,
          }
        );
      });
    event.preventDefault();
  }
}
