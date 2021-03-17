import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { BankAccountsService } from 'src/app/services/bank-accounts/bank-accounts.service';

@Component({
  selector: 'app-bank-account-form',
  templateUrl: './bank-account-form.component.html',
  styleUrls: ['./bank-account-form.component.scss'],
})
export class BankAccountFormComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BankAccountFormComponent>,
    private bankAccountsService: BankAccountsService
  ) {
    this.form = this.formBuilder.group({
      displayName: [null, Validators.required],
      accountNumber: [null, Validators.required],
      currency: ['Colones', Validators.required],
      owner: [null, Validators.required],
      ownerId: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  public saveBankAccountForm(): void {
    this.bankAccountsService
      .addBankAccount(this.form.getRawValue())
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
