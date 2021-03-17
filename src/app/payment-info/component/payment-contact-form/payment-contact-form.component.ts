import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { PaymentContactsService } from 'src/app/services/payment-contacts/payment-contacts.service';

@Component({
  selector: 'app-payment-contact-form',
  templateUrl: './payment-contact-form.component.html',
  styleUrls: ['./payment-contact-form.component.scss'],
})
export class PaymentContactFormComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PaymentContactFormComponent>,
    private paymentContactsService: PaymentContactsService
  ) {
    this.form = this.formBuilder.group({
      displayName: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  ngOnInit(): void {}

  public savePaymentContactForm(): void {
    this.paymentContactsService
      .addPaymentContact(this.form.getRawValue())
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
