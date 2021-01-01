import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { BussinessContactInfoComponent } from '../../pages/bussiness-contact-info/bussiness-contact-info.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BussinessContactTypeOptions } from '../../../constants/bussiness-contact.constants';

@Component({
  selector: 'app-bussiness-contact-dialog',
  templateUrl: './bussiness-contact-dialog.component.html',
  styleUrls: ['./bussiness-contact-dialog.component.scss'],
})
export class BussinessContactDialogComponent implements OnInit {
  public form: FormGroup;
  public typeOptions = BussinessContactTypeOptions;

  constructor(
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    public dialogRef: MatDialogRef<BussinessContactInfoComponent>,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      type: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  public saveBussinessContact(): void {
    this.afs
      .collection('contact-info')
      .add(this.form.value)
      .then((_val) => {
        this.dialogRef.close(this.form.value.value);
        this.snackBar.open(`${this.form.value.value} ha sido añadido`, '', {
          duration: 2000,
        });
      })
      .catch((err) => {
        console.log('error', err);
      });
  }
}
