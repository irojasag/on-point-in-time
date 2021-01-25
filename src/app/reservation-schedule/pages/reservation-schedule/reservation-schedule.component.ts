import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ReservationSchedule } from '../../../models/reservation-schedule.model';
import {
  ReservationScheduleFrequency,
  ReservationScheduleFrequencyOptions,
} from 'src/app/constants/reservation-schedule.constants';
import { map } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ReservationScheduleBottomSheetComponent } from '../../components/reservation-schedule-bottom-sheet/reservation-schedule-bottom-sheet.component';

@Component({
  selector: 'app-reservation-schedule',
  templateUrl: './reservation-schedule.component.html',
  styleUrls: ['./reservation-schedule.component.scss'],
})
export class ReservationScheduleComponent implements OnInit {
  public reservationSchedules$: Observable<ReservationSchedule[]>;

  constructor(
    public auth: AuthService,
    private afs: AngularFirestore,
    private bottomSheet: MatBottomSheet
  ) {
    this.reservationSchedules$ = this.afs
      .collection<ReservationSchedule>('reservation-schedules')
      .valueChanges({ idField: 'id' })
      .pipe(
        map((reservationSchedule) =>
          reservationSchedule.map((reservation) => ({
            ...reservation,
            frequencyDisplayName: this.getFrequencyDisplayName(
              reservation.frequency
            ),
          }))
        )
      );
  }

  public getFrequencyDisplayName(frequencyValue: string): string {
    return ReservationScheduleFrequencyOptions.find(
      (option) => option.value === frequencyValue
    ).displayName;
  }

  ngOnInit(): void {}

  public openBottomSheet(reservationSchedule: ReservationSchedule): void {
    this.bottomSheet.open(ReservationScheduleBottomSheetComponent, {
      data: reservationSchedule,
    });
  }
}
