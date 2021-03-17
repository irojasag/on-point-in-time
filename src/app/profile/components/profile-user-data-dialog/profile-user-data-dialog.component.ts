import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-user-data-dialog',
  templateUrl: './profile-user-data-dialog.component.html',
  styleUrls: ['./profile-user-data-dialog.component.scss'],
})
export class ProfileUserDataDialogComponent implements OnInit {
  public form: FormGroup;
  public today: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<ProfileUserDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private usersService: UserService
  ) {
    this.form = this.formBuilder.group({
      displayName: ['', Validators.required],
      birthDateAt: [''],
    });
    this.form.patchValue({
      displayName: this.data.displayName,
      birthDateAt: this.data.birthDate,
    });
  }

  ngOnInit(): void {}

  public saveProfileData(): void {
    this.usersService
      .updateUser(this.data.uid, this.form.getRawValue())
      .then(() => {
        this.dialogRef.close(this.form.value.value);
        this.snackBar.open('Tu información se ha actualizado', '', {
          duration: 2000,
        });
      })
      .catch((err) => {
        console.log('error', err);
      });
  }
}
