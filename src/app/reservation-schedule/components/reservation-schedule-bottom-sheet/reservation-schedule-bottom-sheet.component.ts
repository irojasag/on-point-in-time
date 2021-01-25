import { Component, OnInit, Inject } from '@angular/core';
import { ReservationSchedule } from 'src/app/models/reservation-schedule.model';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reservation-schedule-bottom-sheet',
  templateUrl: './reservation-schedule-bottom-sheet.component.html',
  styleUrls: ['./reservation-schedule-bottom-sheet.component.scss'],
})
export class ReservationScheduleBottomSheetComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ReservationScheduleBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ReservationSchedule,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  public openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
  }

  public deleteData(event: MouseEvent): void {
    this.afs
      .doc(`reservation-schedules/${this.data.id}`)
      .delete()
      .then(() => {
        this.bottomSheetRef.dismiss();
        this.snackBar.open(`${this.data.displayName} ha sido eliminado`, '', {
          duration: 2000,
        });
      });

    event.preventDefault();
  }
}
