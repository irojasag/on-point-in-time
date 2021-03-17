import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CalendarNotesService } from 'src/app/services/calendar-notes/calendar-notes.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-calendar-note-form',
  templateUrl: './calendar-note-form.component.html',
  styleUrls: ['./calendar-note-form.component.scss'],
})
export class CalendarNoteFormComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CalendarNoteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private calendarNotesService: CalendarNotesService
  ) {
    this.form = this.formBuilder.group({
      content: [null, Validators.required],
    });
  }

  saveNote(): void {
    this.calendarNotesService
      .addCalendarNote({
        ...this.data,
        content: this.form.controls.content.value,
      })
      .then((success) => {
        if (success) {
          this.snackBar.open(`Se ha reservado la fecha`, '', {
            duration: 2000,
          });
          this.dialogRef.close();
        }
      });
  }

  ngOnInit(): void {}
}
