import { Component, OnInit, Inject } from '@angular/core';
import { Purchase } from 'src/app/models/purchase.model';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-purchase-bottom-sheet',
  templateUrl: './purchase-bottom-sheet.component.html',
  styleUrls: ['./purchase-bottom-sheet.component.scss'],
})
export class PurchaseBottomSheetComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<PurchaseBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Purchase,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  public openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
  }

  public deleteData(event: MouseEvent): void {
    this.afs
      .doc(`purchases/${this.data.id}`)
      .delete()
      .then(() => {
        this.bottomSheetRef.dismiss();
        this.snackBar.open(`#${this.data.billNumber} ha sido eliminado`, '', {
          duration: 2000,
        });
      });

    event.preventDefault();
  }
}
