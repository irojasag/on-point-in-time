import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminReservationBottomSheetComponent } from './components/admin-reservation-bottom-sheet/admin-reservation-bottom-sheet.component';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminReservationDialogComponent } from './components/admin-reservation-dialog/admin-reservation-dialog.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CalendarNoteFormComponent } from './components/calendar-note-form/calendar-note-form.component';

@NgModule({
  declarations: [
    CalendarComponent,
    AdminReservationBottomSheetComponent,
    AdminReservationDialogComponent,
    CalendarNoteFormComponent,
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatListModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class CalendarModule {}
