import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  ReservationScheduleFrequency,
  ReservationScheduleFrequencyOptions,
  DefaultWeeklyDistribution,
  ReservationSchedulePeriodOptions,
} from '../../../constants/reservation-schedule.constants';
import { AngularFirestore } from '@angular/fire/firestore';
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
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.form = this.formBuilder.group({
      displayName: [null, Validators.required],
      frequency: [ReservationScheduleFrequency.WEEKLY, Validators.required],
      distribution: [
        JSON.parse(JSON.stringify(this.defaultWeeklyDistribution)),
      ],
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
            this.afs
              .doc(`reservation-schedules/${id}`)
              .valueChanges({ idField: 'id' })
              .subscribe((reservation) => {
                this.form.patchValue(reservation);
              });
          }
        });
      }
    });
  }

  public saveForm(): void {
    if (this.editMode) {
      this.afs
        .doc(`reservation-schedules/${this.reservationId}`)
        .update(this.form.getRawValue())
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
      this.afs
        .collection('reservation-schedules')
        .add(this.form.getRawValue())
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
    this.dialog.open(ReservationScheduleDayTimesDialogComponent, {
      height: '500px',
      width: '400px',
      data: {
        ...data,
        frequency: this.form.controls.frequency.value,
        displayName: this.form.controls.displayName.value,
      },
    });
  }
}
