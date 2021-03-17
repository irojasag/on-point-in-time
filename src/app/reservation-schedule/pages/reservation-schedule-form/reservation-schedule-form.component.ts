import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  ReservationScheduleFrequency,
  ReservationScheduleFrequencyOptions,
  DefaultWeeklyDistribution,
} from '../../../constants/reservation-schedule.constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  getDistributionName,
  getDaySchedule,
} from '../../../helpers/reservation-schedule.helpers';
import { ReservationScheduleDayTimesDialogComponent } from '../../components/reservation-schedule-day-times-dialog/reservation-schedule-day-times-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ReservatonScheduleService } from '../../../services//reservation-schedule/reservaton-schedule.service';
@Component({
  selector: 'app-reservation-schedule-form',
  templateUrl: './reservation-schedule-form.component.html',
  styleUrls: ['./reservation-schedule-form.component.scss'],
})
export class ReservationScheduleFormComponent implements OnInit {
  public form: FormGroup;
  public reservationScheduleFrequencyOptions = ReservationScheduleFrequencyOptions;
  public defaultWeeklyDistribution = DefaultWeeklyDistribution;
  public editMode: boolean;

  public getDistributionName = getDistributionName;
  public getDaySchedule = getDaySchedule;
  private reservationId: string;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private reservationScheduleService: ReservatonScheduleService
  ) {
    this.form = this.formBuilder.group({
      displayName: [null, Validators.required],
      frequency: [ReservationScheduleFrequency.WEEKLY, Validators.required],
      distribution: [
        JSON.parse(JSON.stringify(this.defaultWeeklyDistribution)),
      ],
      showPhotos: [true, Validators.required],
      weight: [0],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      if (data && data.editMode) {
        const reservationId: Observable<string> = this.activatedRoute.params.pipe(
          map((p) => p.id)
        );
        reservationId.subscribe((id) => {
          if (id) {
            this.reservationId = id;
            this.editMode = data.editMode;
            this.reservationScheduleService
              .getReservationSchedule(id)
              .subscribe((reservation) => {
                this.form.patchValue(reservation);
              });
          }
        });
      }
    });
    this.reservationScheduleService.reservationSchedulesNextWeight$.subscribe(
      (next) => {
        if (next) {
          this.form.controls.weight.patchValue(next);
        }
      }
    );
  }

  public saveForm(): void {
    if (this.editMode) {
      this.reservationScheduleService
        .updateReservationSchedule(this.reservationId, this.form.getRawValue())
        .then(() => {
          this.snackBar.open(
            `Se ha actualizado la plantilla ${this.form.value.displayName}`,
            '',
            {
              duration: 2000,
            }
          );
          this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
        })
        .catch((err) => {
          console.log('error', err);
        });
    } else {
      this.reservationScheduleService
        .addReservationSchedule(this.form.getRawValue())
        .then(() => {
          this.snackBar.open(
            `Se ha añadido la plantilla ${this.form.value.displayName}`,
            '',
            {
              duration: 2000,
            }
          );
          this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        })
        .catch((err) => {
          console.log('error', err);
        });
    }
  }

  public openTimeDialog(data): void {
    data.frequency = this.form.controls.frequency.value;
    data.displayName = this.form.controls.displayName.value;
    this.dialog.open(ReservationScheduleDayTimesDialogComponent, {
      height: '500px',
      width: '400px',
      data,
    });
  }
}
