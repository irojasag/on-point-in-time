import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { ReservationSchedule } from '../../../models/reservation-schedule.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ReservationScheduleBottomSheetComponent } from '../../components/reservation-schedule-bottom-sheet/reservation-schedule-bottom-sheet.component';
import { ReservatonScheduleService } from '../../../services/reservation-schedule/reservaton-schedule.service';
@Component({
  selector: 'app-reservation-schedule',
  templateUrl: './reservation-schedule.component.html',
  styleUrls: ['./reservation-schedule.component.scss'],
})
export class ReservationScheduleComponent implements OnInit, OnDestroy {
  public reservationSchedules$: Observable<ReservationSchedule[]>;
  public reservationSchedules: ReservationSchedule[];
  public subscription: Subscription;
  constructor(
    public auth: AuthService,
    private bottomSheet: MatBottomSheet,
    private reservatonScheduleService: ReservatonScheduleService
  ) {
    this.subscription = new Subscription();
    this.reservationSchedules$ = this.reservatonScheduleService.reservationSchedules$;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.reservationSchedules$.subscribe((reservationSchedules) => {
        this.reservationSchedules = reservationSchedules;
      })
    );
  }

  public openBottomSheet(reservationSchedule: ReservationSchedule): void {
    this.bottomSheet.open(ReservationScheduleBottomSheetComponent, {
      data: reservationSchedule,
    });
  }

  public changeScheduleTemplateWeight(index: number, direction: string): void {
    if (direction === 'up') {
      this.reservationSchedules = this.arraymove(
        this.reservationSchedules,
        index,
        -1 + index
      );
    } else {
      this.reservationSchedules = this.arraymove(
        this.reservationSchedules,
        index,
        1 + index
      );
    }
    const arrayCopy = JSON.parse(JSON.stringify(this.reservationSchedules));
    arrayCopy.forEach((schedule: ReservationSchedule, weight: number) => {
      this.reservatonScheduleService.updateReservationSchedule(schedule.id, {
        ...schedule,
        weight,
      });
    });
  }

  arraymove(arr: any[], fromIndex: number, toIndex: number): any[] {
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
