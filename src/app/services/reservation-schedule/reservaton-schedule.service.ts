import { Injectable } from '@angular/core';
import { ReservationSchedule } from 'src/app/models/reservation-schedule.model';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReservationScheduleFrequencyOptions } from 'src/app/constants/reservation-schedule.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReservatonScheduleService {
  public reservationSchedulesNextWeightSubject$: BehaviorSubject<number>;

  constructor(private afs: AngularFirestore) {
    this.reservationSchedulesNextWeightSubject$ = new BehaviorSubject(null);
  }

  public get reservationSchedules$(): Observable<ReservationSchedule[]> {
    return this.afs
      .collection<ReservationSchedule>('reservation-schedules', (ref) =>
        ref.orderBy('weight', 'asc')
      )
      .valueChanges({ idField: 'id' })
      .pipe(
        map((reservationSchedules) => {
          if (reservationSchedules && reservationSchedules.length) {
            reservationSchedules.forEach((reservationSchedule) => {
              reservationSchedule.weight = reservationSchedule.weight || 0;
              reservationSchedule.frequencyDisplayName = this.getFrequencyDisplayName(
                reservationSchedule.frequency
              );
            });
            this.reservationSchedulesNextWeightSubject$.next(
              reservationSchedules[reservationSchedules.length - 1].weight + 1
            );
          }
          return reservationSchedules;
        })
      );
  }

  public get reservationSchedulesNextWeight$(): Observable<number> {
    return this.reservationSchedulesNextWeightSubject$.asObservable();
  }

  public getFrequencyDisplayName(frequencyValue: string): string {
    return ReservationScheduleFrequencyOptions.find(
      (option) => option.value === frequencyValue
    ).displayName;
  }
}
