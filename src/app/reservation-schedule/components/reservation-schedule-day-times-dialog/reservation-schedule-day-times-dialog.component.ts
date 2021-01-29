import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getDistributionName } from 'src/app/helpers/reservation-schedule.helpers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  ReservationSchedulePeriodOptions,
  ReservationScheduleHoursOptions,
  ReservationScheduleMinutesOptions,
  ReservationSchedulePeriod,
} from 'src/app/constants/reservation-schedule.constants';

@Component({
  selector: 'app-reservation-schedule-day-times-dialog',
  templateUrl: './reservation-schedule-day-times-dialog.component.html',
  styleUrls: ['./reservation-schedule-day-times-dialog.component.scss'],
})
export class ReservationScheduleDayTimesDialogComponent implements OnInit {
  public getDistributionName = getDistributionName;
  public reservationSchedulePeriodOptions = ReservationSchedulePeriodOptions;
  public reservationScheduleHoursOptions = ReservationScheduleHoursOptions;
  public reservationScheduleMinutesOptions = ReservationScheduleMinutesOptions;

  public form: FormGroup;
  public addMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<ReservationScheduleDayTimesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      hours: [ReservationScheduleHoursOptions[0].value, Validators.required],
      minutes: [
        ReservationScheduleMinutesOptions[0].value,
        Validators.required,
      ],
      period: [ReservationSchedulePeriod.AM, Validators.required],
      spaces: [null, Validators.required],
      customName: [this.data.displayName],
    });
  }

  ngOnInit(): void {}

  public removeItem(index: number): void {
    this.data.times = this.data.times.filter((_, idx) => {
      return idx !== index;
    });
  }

  public addNewToList(): void {
    const newItem = {
      ...this.form.value,
      hour: this.form.value.hours + ':' + this.form.value.minutes,
    };
    this.data.times.push(newItem);
    this.data.times.sort((first, second) => {
      let firstHour = Number(first.hour.split(':')[0]);
      if (firstHour === 12 && first.period === ReservationSchedulePeriod.AM) {
        firstHour = 0;
      }
      if (first.period === 'PM' && firstHour !== 12) {
        firstHour += 12;
      }

      let secondHour = Number(second.hour.split(':')[0]);
      if (secondHour === 12 && second.period === ReservationSchedulePeriod.AM) {
        secondHour = 0;
      }
      if (second.period === ReservationSchedulePeriod.PM && secondHour !== 12) {
        secondHour += 12;
      }
      const firstTime = new Date(
        2000,
        0,
        1,
        firstHour,
        Number(first.hour.split(':')[1]),
        0
      );
      const secondTime = new Date(
        2000,
        0,
        1,
        secondHour,
        Number(second.hour.split(':')[1]),
        0
      );

      return firstTime.getTime() - secondTime.getTime();
    });

    this.addMode = false;
  }
}
