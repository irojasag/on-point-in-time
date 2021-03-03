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
import { Purchase } from 'src/app/models/purchase.model';
import { Product } from 'src/app/models/product.model';
import {
  isDateInThisWeek,
  lessThanXHoursToTheFuture,
} from '../../../helpers/general.helper';
import { ReservationSchedulePeriod } from 'src/app/constants/reservation-schedule.constants';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AdminReservationBottomSheetComponent } from '../../components/admin-reservation-bottom-sheet/admin-reservation-bottom-sheet.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminReservationDialogComponent } from '../../components/admin-reservation-dialog/admin-reservation-dialog.component';
import { not } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  public schedules$: Observable<ReservationSchedule[]>;
  public reservations$: Observable<Reservation[]>;
  public purchases$: Observable<Purchase[]>;
  public products$: Observable<Product[]>;
  public products: Product[] = [];
  public selectedProducts: Product[] = [];
  public schedules: ReservationSchedule[];
  public reservations: Reservation[];
  public form: FormGroup;

  public selectedSchedule: ReservationSchedule;

  public nearbyDates: any[] = [];
  public availableHours = [];
  public dateControl: FormControl;

  public user: User;

  public haveActiveProducts: boolean;

  public loading: boolean;

  constructor(
    private renderer: Renderer2,
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) {
    this.loading = true;

    this.haveActiveProducts = false;
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
      this.selectedProducts = this.products.filter(
        (product) => product.type === this.selectedSchedule.id
      );
      this.haveActiveProducts = !!this.selectedProducts.length;
      this.updateNearByDates();
      this.loading = false;
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
      if (user) {
        this.purchases$ = this.afs
          .collection<Purchase>('purchases', (ref) => {
            return ref.where('clientId', '==', this.user.uid);
          })
          .valueChanges({ idField: 'id' })
          .pipe(
            map((purchases) => {
              return (purchases || []).map((purchase) => {
                const products = [];
                purchase.products.forEach((product) => {
                  product.expirationDateDisplay = product.expirationDate.toDate();
                  product.startDate = product.startDate || purchase.purchasedAt;
                  product.startDateDisplay = product.startDate.toDate();
                  product.startDateDisplay.setHours(0, 0, 0, 0);
                  if (
                    product.expirationDate.toDate().getTime() >=
                    new Date().getTime()
                  ) {
                    const today = new Date();
                    const difference =
                      product.expirationDateDisplay.getTime() - today.getTime();
                    const dayDiffence = Math.trunc(
                      difference / (1000 * 3600 * 24)
                    );
                    products.push({ ...product, dayDiffence });
                  }
                });
                return { ...purchase, products };
              });
            })
          );
        this.products$ = this.purchases$.pipe(
          map((purchases) => {
            const products = [];
            (purchases || []).forEach((purchase) => {
              if (purchase.products.length) {
                purchase.products.forEach((prod) => ({
                  ...prod,
                  reservationsPerDay: prod.reservationsPerDay || 1,
                }));
                products.push(...purchase.products);
              }
            });
            products.sort((first, second) => {
              return first.dayDiffence - second.dayDiffence;
            });
            return products;
          })
        );
        this.products$.subscribe((products) => {
          this.products = products;
          if (this.selectedSchedule) {
            this.selectedProducts = this.products.filter(
              (product) => product.type === this.selectedSchedule.id
            );
            this.haveActiveProducts = !!this.selectedProducts.length;
          }
          this.loading = false;
        });
      }
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
          this.selectedProducts = this.products.filter(
            (product) => product.type === this.selectedSchedule.id
          );
          this.haveActiveProducts = !!this.selectedProducts.length;
          this.updateNearByDates();
          this.loading = false;
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
            const firstDate =
              (nearbyDate.date as Date).getFullYear() +
              '-' +
              (nearbyDate.date as Date).getMonth() +
              '-' +
              (nearbyDate.date as Date).getDate();
            const secondDate =
              (reservation.dateToDisplay as Date).getFullYear() +
              '-' +
              (reservation.dateToDisplay as Date).getMonth() +
              '-' +
              (reservation.dateToDisplay as Date).getDate();

            const condition =
              reservation.reservationScheduleId === this.selectedSchedule.id &&
              firstDate === secondDate &&
              reservation.time === time.time;

            if (condition && reservation.userId === this.user.uid) {
              time.booked = true;
              time.confirmed = reservation.confirmed;
              time.asisted = reservation.asisted;

              let reservationHour = Number(reservation.hour.split(':')[0]);
              if (
                reservationHour === 12 &&
                reservation.period === ReservationSchedulePeriod.AM
              ) {
                reservationHour = 0;
              }
              if (
                reservation.period === ReservationSchedulePeriod.PM &&
                reservationHour !== 12
              ) {
                reservationHour += 12;
              }
              const reservationTime = new Date(
                reservation.dateToDisplay.getFullYear(),
                reservation.dateToDisplay.getMonth(),
                reservation.dateToDisplay.getDate(),
                reservationHour,
                Number(reservation.hour.split(':')[1]),
                0
              );
              time.locked = lessThanXHoursToTheFuture(reservationTime, 1);
            }
            return condition;
          }
        );

        time.reservations = timeReservations;
      });
      nearbyDate.displayName =
        distribution.displayName || this.selectedSchedule.displayName;
    });
    this.loading = false;
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
    schedule.date.setHours(0, 0, 0);
    if (this.loading) {
      return;
    }

    if (this.user.isAdmin || this.user.isSuperAdmin) {
      this.showAdminAddReservationDialog(schedule, time);
    } else {
      this.loading = true;
      const notExpiredProducts = this.selectedProducts.filter((product) => {
        return (
          product.startDateDisplay.getTime() <= schedule.date.getTime() &&
          product.expirationDateDisplay.getTime() >= schedule.date.getTime()
        );
      });
      const currentWeekReservations = (this.reservations || []).filter(
        (reservation) => {
          return (
            reservation.userId === this.user.uid &&
            reservation.reservationScheduleId === this.selectedSchedule.id &&
            isDateInThisWeek(reservation.dateToDisplay, new Date(schedule.date))
          );
        }
      );

      const newReservDate = `${schedule.date.getFullYear()}-${
        (schedule.date.getMonth() < 10 ? '0' : '') + schedule.date.getMonth()
      }-${schedule.date.getDate()}`;

      const currentReservationDates = currentWeekReservations.map(
        (reserv) =>
          `${reserv.dateToDisplay.getFullYear()}-${
            (reserv.dateToDisplay.getMonth() < 10 ? '0' : '') +
            reserv.dateToDisplay.getMonth()
          }-${reserv.dateToDisplay.getDate()}`
      );
      currentReservationDates.push(newReservDate);
      currentReservationDates.sort();

      let distributionForLimitedReservations = [0, 0, 0, 0, 0, 0, 0];
      notExpiredProducts
        .filter((prod) => prod.reservationsPerDay)
        .forEach((prod) => {
          let remainingReservPerWeek = 0 + prod.reservationsPerWeek;
          let index = -1;
          while (remainingReservPerWeek) {
            index++;
            if (remainingReservPerWeek - prod.reservationsPerDay >= 0) {
              distributionForLimitedReservations[index] +=
                prod.reservationsPerDay;
              remainingReservPerWeek =
                remainingReservPerWeek - prod.reservationsPerDay;
            } else {
              distributionForLimitedReservations[
                index
              ] += remainingReservPerWeek;
              remainingReservPerWeek = 0;
            }
          }
          return prod;
        });

      distributionForLimitedReservations = distributionForLimitedReservations.filter(
        (reserv) => !!reserv
      );

      let allowReservation = true;
      let pastDate = null;
      let isNewDate = false;
      let isFirst = true;
      let lastAvailability = null;

      currentReservationDates.forEach((date) => {
        if (pastDate !== date) {
          pastDate = date;
          isNewDate = true;
          if (isNewDate && !isFirst) {
            distributionForLimitedReservations.push(
              distributionForLimitedReservations.shift()
            );
            distributionForLimitedReservations = distributionForLimitedReservations.filter(
              (reserv) => !!reserv
            );
          }
          isFirst = false;
        }

        if (date === newReservDate) {
          lastAvailability = distributionForLimitedReservations[0] || 0;
        }
        if (distributionForLimitedReservations.length) {
          distributionForLimitedReservations[0]--;
        }
      });

      if (
        lastAvailability > 0 ||
        (lastAvailability === null &&
          distributionForLimitedReservations[1] &&
          distributionForLimitedReservations[1] > 0)
      ) {
        allowReservation = true;
      } else {
        allowReservation = false;
      }

      if (allowReservation) {
        this.loading = true;
        this.afs
          .collection('reservations')
          .add({
            reservationScheduleId: this.selectedSchedule.id,
            date: schedule.date,
            userId: this.user.uid,
            hour: time.hour,
            period: time.period,
            confirmed: false,
            asisted: false,
          })
          .then((success) => {
            if (success) {
              this.snackBar.open(`Se ha reservado la fecha`, '', {
                duration: 2000,
              });
            }
          });
      } else {
        this.loading = false;
        this.snackBar.open(
          `Tus productos no permiten realizar esta reservación`,
          '',
          {
            duration: 2000,
          }
        );
      }
    }
  }

  private showAdminAddReservationDialog(
    schedule: ReservationScheduleDistribution & { date: Date },
    time: ReservationScheduleTime
  ) {
    this.dialog.open(AdminReservationDialogComponent, {
      height: '180px',
      width: '300px',
      data: {
        reservationScheduleId: this.selectedSchedule.id,
        date: schedule.date,
        userId: this.user.uid,
        hour: time.hour,
        period: time.period,
        confirmed: false,
        asisted: false,
      },
    });
  }

  public removeReservation(reservations: Reservation[]): void {
    if (this.loading) {
      return;
    }
    this.loading = true;

    const reservation = reservations.find(
      (reserv) => reserv.userId === this.user.uid
    );
    this.afs
      .doc(`reservations/${reservation.id}`)
      .delete()
      .then(() => {
        this.snackBar.open(`Se ha eliminado la reserva`, '', {
          duration: 2000,
        });
      });
  }

  public confirmReservation(reservation: Reservation): void {
    this.afs
      .doc(`reservations/${reservation.id}`)
      .update({ ...reservation, confirmed: true })
      .then(() => {
        this.snackBar.open(`Se ha confirmado la reserva`, '', {
          duration: 2000,
        });
      });
  }

  public confirmAsistance(reservation: Reservation): void {
    this.afs
      .doc(`reservations/${reservation.id}`)
      .update({ ...reservation, asisted: true })
      .then(() => {
        this.snackBar.open(`Se ha confirmado la reserva`, '', {
          duration: 2000,
        });
      });
  }

  public openBottomSheetForResearvations(reservation: Reservation): void {
    this.bottomSheet.open(AdminReservationBottomSheetComponent, {
      data: reservation,
    });
  }
}
