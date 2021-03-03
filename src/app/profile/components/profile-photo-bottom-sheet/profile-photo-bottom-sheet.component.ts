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
import { NgxImageCompressService, DOC_ORIENTATION } from 'ngx-image-compress';

@Component({
  selector: 'app-profile-photo-bottom-sheet',
  templateUrl: './profile-photo-bottom-sheet.component.html',
  styleUrls: ['./profile-photo-bottom-sheet.component.scss'],
})
export class ProfilePhotoBottomSheetComponent implements OnInit {
  private files: Array<any> = [];
  public allowCapture: boolean;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ProfilePhotoBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: User,
    private afst: AngularFireStorage,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    private imageCompress: NgxImageCompressService
  ) {}
  ngOnInit(): void {
    this.allowCapture =
      (document.createElement('input') as any).capture !== undefined;

    this.configureFileUploader();
  }

  private configureFileUploader(): void {
    const fileUpload = document.getElementById(
      'fileUpload'
    ) as HTMLInputElement;
    fileUpload.onchange = (fileUploadEvent: MouseEvent) => {
      const file = (fileUploadEvent.target as HTMLInputElement).files[0];
      const refDir = `${this.data.uid}/profile-photos/${Date.now()}`;
      const fileRef = this.afst.ref(refDir);

      this.updateFileOnStorage(refDir, file, fileRef);
    };
  }

  private updateFileOnStorage(refDir: string, file: any, fileRef): void {
    this.afst
      .upload(refDir, file)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((photoURL) => {
            if (photoURL) {
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
        }
      });
  }

  public uploadPhoto(event): void {
    event.preventDefault();
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imgResultBeforeCompress = image;
      this.imageCompress
        .compressFile(image, DOC_ORIENTATION.Up)
        .then((result) => {
          this.imgResultAfterCompress = result;
          this.imageCompress
            .compressFile(image, DOC_ORIENTATION.NotDefined)
            .then((resUrl) => {
              fetch(resUrl)
                .then((res) => res.blob())
                .then((blob) => {
                  const file = new File([blob], 'nose', { type: 'image/png' });
                  const refDir = `${
                    this.data.uid
                  }/profile-photos/${Date.now()}`;
                  const fileRef = this.afst.ref(refDir);
                  this.updateFileOnStorage(refDir, file, fileRef);
                });
            });
        });
    });
  }
}
