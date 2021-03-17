import { Component, OnInit, Inject } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { ContactInfo } from 'src/app/models/contact-info.model ';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-update-bottom-sheet',
  templateUrl: './user-update-bottom-sheet.component.html',
  styleUrls: ['./user-update-bottom-sheet.component.scss'],
})
export class UserUpdateBottomSheetComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<UserUpdateBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ContactInfo,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {}

  public openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
  }

  public deleteData(event: MouseEvent): void {
    this.afs
      .doc(`contact-info/${this.data.id}`)
      .delete()
      .then(() => {
        this.bottomSheetRef.dismiss();
        this.snackBar.open(`${this.data.value} ha sido eliminado`, '', {
          duration: 2000,
        });
      });

    event.preventDefault();
  }
}
