import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProfilePhotoBottomSheetComponent } from '../../components/profile-photo-bottom-sheet/profile-photo-bottom-sheet.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public user: User;
  constructor(
    public auth: AuthService,
    private afst: AngularFireStorage,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;
      // if (this.user) {
      //   this.afst
      //     .ref(`${user.uid}/unnamed.jpg`)
      //     .getDownloadURL()
      //     .subscribe(console.log);
      // }
    });
  }

  public openProfilePhotoBottomSheet(): void {
    this.bottomSheet.open(ProfilePhotoBottomSheetComponent, {
      data: this.user,
    });
  }
}
