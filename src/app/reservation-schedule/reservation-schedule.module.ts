import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationScheduleRoutingModule } from './reservation-schedule-routing.module';
import { ReservationScheduleComponent } from './pages/reservation-schedule/reservation-schedule.component';
import { ReservationScheduleFormComponent } from './pages/reservation-schedule-form/reservation-schedule-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

@NgModule({
  declarations: [
    ReservationScheduleComponent,
    ReservationScheduleFormComponent,
  ],
  imports: [
    CommonModule,
    ReservationScheduleRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatBottomSheetModule,
  ],
})
export class ReservationScheduleModule {}
