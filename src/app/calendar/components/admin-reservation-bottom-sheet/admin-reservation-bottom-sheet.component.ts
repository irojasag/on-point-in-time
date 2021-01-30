import { Component, OnInit, Inject } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { Reservation } from 'src/app/models/reservation.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-reservation-bottom-sheet',
  templateUrl: './admin-reservation-bottom-sheet.component.html',
  styleUrls: ['./admin-reservation-bottom-sheet.component.scss'],
})
export class AdminReservationBottomSheetComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<AdminReservationBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Reservation,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  public removeReservation(event): void {
    event.preventDefault();
    this.afs
      .doc(`reservations/${this.data.id}`)
      .delete()
      .then(() => {
        this.snackBar.open(`Se ha eliminado la reserva`, '', {
          duration: 2000,
        });
        this.bottomSheetRef.dismiss();
      });
  }
}
