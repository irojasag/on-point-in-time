import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProfilePhotoBottomSheetComponent } from '../../components/profile-photo-bottom-sheet/profile-photo-bottom-sheet.component';
import { MatDialog } from '@angular/material/dialog';
import { ProfileUserDataDialogComponent } from '../../components/profile-user-data-dialog/profile-user-data-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  public openProfilePhotoBottomSheet(user: User): void {
    this.bottomSheet.open(ProfilePhotoBottomSheetComponent, {
      data: user,
    });
  }

  public openUserDataFormDialog(user: User): void {
    this.dialog.open(ProfileUserDataDialogComponent, {
      height: '400px',
      width: '300px',
      data: user,
    });
  }
}
