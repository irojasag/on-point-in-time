import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  ReservationScheduleFrequency,
  ReservationScheduleFrequencyOptions,
} from '../../../constants/reservation-schedule.constants';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-schedule-form',
  templateUrl: './reservation-schedule-form.component.html',
  styleUrls: ['./reservation-schedule-form.component.scss'],
})
export class ReservationScheduleFormComponent implements OnInit {
  public form: FormGroup;
  public reservationScheduleFrequencyOptions = ReservationScheduleFrequencyOptions;

  constructor(
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      displayName: [null, Validators.required],
      frequency: [ReservationScheduleFrequency.WEEKLY, Validators.required],
    });
  }

  ngOnInit(): void {}

  public saveForm(): void {
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
