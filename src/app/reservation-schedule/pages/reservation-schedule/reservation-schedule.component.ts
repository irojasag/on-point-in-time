import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ReservationSchedule } from '../../../models/reservation-schedule.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ReservationScheduleBottomSheetComponent } from '../../components/reservation-schedule-bottom-sheet/reservation-schedule-bottom-sheet.component';
import { ReservatonScheduleService } from '../../../services/reservation-schedule/reservaton-schedule.service';
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
    private bottomSheet: MatBottomSheet,
    private reservatonScheduleService: ReservatonScheduleService
  ) {
    this.reservationSchedules$ = this.reservatonScheduleService.reservationSchedules$;
  }

  ngOnInit(): void {}

  public openBottomSheet(reservationSchedule: ReservationSchedule): void {
    this.bottomSheet.open(ReservationScheduleBottomSheetComponent, {
      data: reservationSchedule,
    });
  }
}
