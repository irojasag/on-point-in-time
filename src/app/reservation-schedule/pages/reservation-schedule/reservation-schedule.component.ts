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

@Component({
  selector: 'app-reservation-schedule',
  templateUrl: './reservation-schedule.component.html',
  styleUrls: ['./reservation-schedule.component.scss'],
})
export class ReservationScheduleComponent implements OnInit {
  public reservationSchedules$: Observable<ReservationSchedule[]>;

  constructor(public auth: AuthService, private afs: AngularFirestore) {
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
}
