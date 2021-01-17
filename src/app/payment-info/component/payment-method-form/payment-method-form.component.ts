import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-method-form',
  templateUrl: './payment-method-form.component.html',
  styleUrls: ['./payment-method-form.component.scss'],
})
export class PaymentMethodFormComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PaymentMethodFormComponent>
  ) {
    this.form = this.formBuilder.group({
      displayName: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  public savePaymentMethodForm(): void {
    this.afs
      .collection('payment-methods')
      .add(this.form.value)
      .then(() => {
        this.snackBar.open(
          `${this.form.value.displayName} ha sido añadido`,
          '',
          {
            duration: 2000,
          }
        );
        this.dialogRef.close(this.form.value.value);
      })
      .catch((err) => {
        console.log('error', err);
      });
  }
}
