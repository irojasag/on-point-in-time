import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile-photo-bottom-sheet',
  templateUrl: './profile-photo-bottom-sheet.component.html',
  styleUrls: ['./profile-photo-bottom-sheet.component.scss'],
})
export class ProfilePhotoBottomSheetComponent implements OnInit {
  private files: Array<any> = [];
  public allowCapture: boolean;
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ProfilePhotoBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: User,
    private afst: AngularFireStorage,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.allowCapture =
      (document.createElement('input') as any).capture !== undefined;

    this.configureFileUploader();
    this.configureFileUploaderWithCamera();
  }

  private configureFileUploaderWithCamera(): void {
    const fileUpload = document.getElementById(
      'fileUploadWithCamera'
    ) as HTMLInputElement;
    fileUpload.onchange = (fileUploadEvent: MouseEvent) => {
      const file = (fileUploadEvent.target as HTMLInputElement).files[0];
      const refDir = `${this.data.uid}/profile-photos/${Date.now()}`;
      const fileRef = this.afst.ref(refDir);

      this.afst
        .upload(refDir, file)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((photoURL) => {
              if (photoURL) {
                console.log('photoURL', photoURL);
                this.afs.doc(`users/${this.data.uid}`).update({ photoURL });
              }
            });
            this.snackBar.open('Tu foto de perfil ha sido actualizada!', '', {
              duration: 2000,
            });
            this.bottomSheetRef.dismiss();
          })
        )
        .subscribe((url) => {
          if (url) {
            console.log(url);
          }
        });
    };
  }
  private configureFileUploader(): void {
    const fileUpload = document.getElementById(
      'fileUpload'
    ) as HTMLInputElement;
    fileUpload.onchange = (fileUploadEvent: MouseEvent) => {
      const file = (fileUploadEvent.target as HTMLInputElement).files[0];
      const refDir = `${this.data.uid}/profile-photos/${Date.now()}`;
      const fileRef = this.afst.ref(refDir);

      this.afst
        .upload(refDir, file)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((photoURL) => {
              if (photoURL) {
                console.log('photoURL', photoURL);
                this.afs.doc(`users/${this.data.uid}`).update({ photoURL });
              }
            });
            this.snackBar.open('Tu foto de perfil ha sido actualizada!', '', {
              duration: 2000,
            });
            this.bottomSheetRef.dismiss();
          })
        )
        .subscribe((url) => {
          if (url) {
            console.log(url);
          }
        });
    };
  }

  public uploadPhoto(event): void {
    const fileUpload = document.getElementById(
      'fileUpload'
    ) as HTMLInputElement;
    fileUpload.click();
    event.preventDefault();
  }

  public uploadCameraPhoto(event): void {
    const fileUploadWithCamera = document.getElementById(
      'fileUploadWithCamera'
    ) as HTMLInputElement;
    fileUploadWithCamera.click();
    event.preventDefault();
  }
}
