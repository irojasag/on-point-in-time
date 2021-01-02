import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private afs: AngularFirestore,
    private snackBar: MatSnackBar
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
    this.afs
      .doc(`users/${this.data.uid}`)
      .update(this.form.value)
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
