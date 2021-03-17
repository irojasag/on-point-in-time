import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user/user.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@Component({
  selector: 'app-admin-reservation-dialog',
  templateUrl: './admin-reservation-dialog.component.html',
  styleUrls: ['./admin-reservation-dialog.component.scss'],
})
export class AdminReservationDialogComponent implements OnInit {
  public form: FormGroup;

  public users: User[];
  public selectedUser: User;
  public users$: Observable<User[]>;
  public filteredUsers$: Observable<User[]>;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AdminReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private reservationService: ReservationService
  ) {
    this.form = this.formBuilder.group({
      userId: [null, Validators.required],
    });

    this.users$ = this.userService.users$;
    this.users$.subscribe((users) => (this.users = users));

    this.filteredUsers$ = this.form.controls.userId.valueChanges.pipe(
      startWith(''),
      map((state) =>
        state ? this._filterUsers(state) : (this.users || []).slice()
      )
    );
  }

  private _filterUsers(value: string): User[] {
    const filterValue = (value || '').toLowerCase();

    return (this.users || []).filter(
      (user) => user.displayName.toLowerCase().indexOf(filterValue) !== -1
    );
  }

  public selectUser(user): void {
    this.selectedUser = user;
  }

  saveReservation(): void {
    this.reservationService
      .addReservation({
        ...this.data,
        userId: this.selectedUser.uid,
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
