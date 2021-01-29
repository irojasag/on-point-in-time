import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest, of } from 'rxjs';
import {
  ReservationSchedule,
  ReservationScheduleDistribution,
  ReservationScheduleTime,
} from 'src/app/models/reservation-schedule.model';
import { Reservation } from 'src/app/models/reservation.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  public schedules$: Observable<ReservationSchedule[]>;
  public reservations$: Observable<Reservation[]>;
  public schedules: ReservationSchedule[];
  public reservations: Reservation[];
  public form: FormGroup;

  public selectedSchedule: ReservationSchedule;

  public nearbyDates: any[] = [];
  public availableHours = [];
  public dateControl: FormControl;

  public user: User;

  constructor(
    private renderer: Renderer2,
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      schedule: [null, Validators.required],
    });

    this.setObservables();

    this.dateControl = new FormControl(new Date());
  }

  private setObservables(): void {
    this.schedules$ = this.afs
      .collection<ReservationSchedule>('reservation-schedules')
      .valueChanges({ idField: 'id' });

    this.reservations$ = this.afs
      .collection<Reservation>('reservations')
      .valueChanges({ idField: 'id' })
      .pipe(
        switchMap((reservations) => {
          const userIds = [...new Set(reservations.map((pur) => pur.userId))];

          return combineLatest([
            of(reservations),
            combineLatest(
              userIds.map((userId) =>
                this.afs
                  .collection<User>('users', (ref) =>
                    ref.where('uid', '==', userId)
                  )
                  .valueChanges()
                  .pipe(map((users) => users[0]))
              )
            ),
          ]);
        }),
        map(([reservations, users]) => {
          return reservations.map((reservation) => {
            return {
              ...reservation,
              dateToDisplay: reservation.date.toDate(),
              time: reservation.hour + ' ' + reservation.period,
              user: users.find((a) => a.uid === reservation.userId),
            };
          });
        })
      );

    this.form.controls.schedule.valueChanges.subscribe((newValue) => {
      const selectedSchedule = this.schedules.find(
        (schedule) => schedule.id === newValue
      );

      this.selectedSchedule = selectedSchedule;
      this.updateNearByDates();
    });

    // this.dateControl.valueChanges.subscribe((newDate) => {
    //   let index = 0;
    //   this.nearbyDates.find((currentDate, i) => {
    //     let date = ('0' + currentDate.getDate()).slice(-2);
    //     let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    //     let year = currentDate.getFullYear();

    //     currentDate = `${date}-${month}-${year}`;

    //     date = ('0' + newDate.getDate()).slice(-2);
    //     month = ('0' + (newDate.getMonth() + 1)).slice(-2);
    //     year = year = newDate.getFullYear();

    //     const dateToSearch = `${date}-${month}-${year}`;
    //     if (dateToSearch === currentDate) {
    //       index = i;
    //       return true;
    //     }
    //     return false;
    //   });
    //   this.scroll('date-' + index);
    // });
  }

  ngOnInit(): void {
    this.addNewDates();
    this.handleSchedulesSubscription();
    this.handleReservationsSubscription();
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });
  }

  private handleSchedulesSubscription(): void {
    this.schedules$.subscribe((schedules) => {
      this.schedules = schedules;
      if (this.schedules) {
        this.schedules = this.schedules.map((schedule) => {
          schedule.distribution = schedule.distribution.map((dist) => {
            return {
              ...dist,
              times: dist.times.map((time) => {
                return {
                  ...time,
                  time: time.hour + ' ' + time.period,
                  displayName: time.customName || schedule.displayName,
                };
              }),
            };
          });
          return schedule;
        });
        if (!this.selectedSchedule) {
          this.form.controls.schedule.patchValue(this.schedules[0].id);
          this.selectedSchedule = this.schedules[0];

          this.updateNearByDates();
        }
      }
    });
  }

  private handleReservationsSubscription(): void {
    this.reservations$.subscribe((reservations) => {
      this.reservations = reservations || [];
      if (this.reservations) {
        this.updateNearByDates();
      }
    });
  }

  private updateNearByDates(): void {
    this.nearbyDates.forEach((nearbyDate) => {
      const date = nearbyDate.date;
      const day = date.getDay();
      const distribution = this.selectedSchedule.distribution.find(
        (dist) => dist.day === day
      );

      nearbyDate.times = JSON.parse(JSON.stringify(distribution.times));
      nearbyDate.times.forEach((time) => {
        time.reservations = [];
        const timeReservations = (this.reservations || []).filter(
          (reservation) => {
            const first =
              (nearbyDate.date as Date).getFullYear() +
              '-' +
              (nearbyDate.date as Date).getMonth() +
              '-' +
              (nearbyDate.date as Date).getDate();
            const second =
              (reservation.dateToDisplay as Date).getFullYear() +
              '-' +
              (reservation.dateToDisplay as Date).getMonth() +
              '-' +
              (reservation.dateToDisplay as Date).getDate();

            return first === second && reservation.time === time.time;
          }
        );

        time.reservations = timeReservations;
      });
      nearbyDate.displayName =
        distribution.displayName || this.selectedSchedule.displayName;
    });
  }

  private addNewDates(): void {
    const length = this.nearbyDates.length;
    for (let i = 0; i < 20; i++) {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + i + length);
      newDate.setHours(0, 0, 0, 0);
      this.nearbyDates.push({ date: newDate });
    }
  }

  public scroll(id): void {
    setTimeout(() => {
      const element = this.renderer.selectRootElement(`#${id}`, true);
      element.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  }

  public addReservation(
    schedule: ReservationScheduleDistribution & { date: Date },
    time: ReservationScheduleTime
  ): void {
    this.afs
      .collection('reservations')
      .add({
        date: schedule.date,
        userId: this.user.uid,
        hour: time.hour,
        period: time.period,
      })
      .then((success) => {
        if (success) {
          this.snackBar.open(`Se ha reservado la fecha`, '', {
            duration: 2000,
          });
        }
      });
  }
}
