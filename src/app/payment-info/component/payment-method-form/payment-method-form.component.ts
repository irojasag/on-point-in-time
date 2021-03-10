import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { PaymentMethodsService } from 'src/app/services/payment-methods/payment-methods.service';

@Component({
  selector: 'app-payment-method-form',
  templateUrl: './payment-method-form.component.html',
  styleUrls: ['./payment-method-form.component.scss'],
})
export class PaymentMethodFormComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PaymentMethodFormComponent>,
    private paymentMethodsService: PaymentMethodsService
  ) {
    this.form = this.formBuilder.group({
      displayName: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  public savePaymentMethodForm(): void {
    this.paymentMethodsService
      .addPaymentMethod(this.form.getRawValue())
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
