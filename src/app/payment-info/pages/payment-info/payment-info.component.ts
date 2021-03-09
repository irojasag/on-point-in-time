import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PaymentMethod } from '../../../models/payment-method.model';
import { BankAccount } from '../../../models/bank-account.model';
import { PaymentContact } from '../../../models/payment-contact.model';
import { MatDialog } from '@angular/material/dialog';
import { PaymentMethodFormComponent } from '../../component/payment-method-form/payment-method-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BankAccountFormComponent } from '../../component/bank-account-form/bank-account-form.component';
import { PaymentContactFormComponent } from '../../component/payment-contact-form/payment-contact-form.component';
import { copyToClipBoard } from 'src/app/helpers/utils.helpers';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss'],
})
export class PaymentInfoComponent implements OnInit {
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;
  @ViewChild('deleteBankAccountDialog')
  deleteBankAccountDialog: TemplateRef<any>;
  @ViewChild('deletePaymentContactDialog')
  deletePaymentContactDialog: TemplateRef<any>;

  public paymentMethods$: Observable<PaymentMethod[]>;
  public bankAccounts$: Observable<BankAccount[]>;
  public paymentContact$: Observable<PaymentContact[]>;

  constructor(
    public auth: AuthService,
    private afs: AngularFirestore,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.paymentMethods$ = this.afs
      .collection<PaymentMethod>('payment-methods')
      .valueChanges({ idField: 'id' });

    this.bankAccounts$ = this.afs
      .collection<BankAccount>('bank-accounts')
      .valueChanges({ idField: 'id' });

    this.paymentContact$ = this.afs
      .collection<PaymentContact>('payment-contacts')
      .valueChanges({ idField: 'id' });
  }

  ngOnInit(): void {}

  public openAddDialog(): void {
    this.dialog.open(PaymentMethodFormComponent, {
      height: '400px',
      width: '300px',
    });
  }

  public openBankAccountAddDialog(): void {
    this.dialog.open(BankAccountFormComponent, {
      height: '400px',
      width: '300px',
    });
  }

  public openPaymentContactAddDialog(): void {
    this.dialog.open(PaymentContactFormComponent, {
      height: '400px',
      width: '300px',
    });
  }

  public openDeletePaymentMethodDialog(paymentMethod: PaymentMethod): void {
    this.dialog.open(this.deleteDialog, {
      height: '212px',
      width: '300px',
      data: paymentMethod,
    });
  }

  public openDeleteBankAccountDialog(bankAccount: PaymentMethod): void {
    this.dialog.open(this.deleteBankAccountDialog, {
      height: '212px',
      width: '300px',
      data: bankAccount,
    });
  }

  public openDeletePaymentContactDialog(paymentContact: PaymentContact): void {
    this.dialog.open(this.deletePaymentContactDialog, {
      height: '212px',
      width: '300px',
      data: paymentContact,
    });
  }

  public deletePaymentMetod(paymentMethod: PaymentMethod): void {
    this.afs
      .doc(`payment-methods/${paymentMethod.id}`)
      .delete()
      .then(() => {
        this.snackBar.open(
          `${paymentMethod.displayName} ha sido eliminado`,
          '',
          {
            duration: 2000,
          }
        );
      });
  }

  public deleteBankAccount(bankAccount: BankAccount): void {
    this.afs
      .doc(`bank-accounts/${bankAccount.id}`)
      .delete()
      .then(() => {
        this.snackBar.open(`${bankAccount.displayName} ha sido eliminado`, '', {
          duration: 2000,
        });
      });
  }

  public deletePaymentContact(paymentContact: PaymentContact): void {
    this.afs
      .doc(`payment-contacts/${paymentContact.id}`)
      .delete()
      .then(() => {
        this.snackBar.open(
          `${paymentContact.displayName} ha sido eliminado`,
          '',
          {
            duration: 2000,
          }
        );
      });
  }

  public generateValidWhatsappNumber(phoneNumber: string): string {
    let onlyNumbers = phoneNumber.replace(/[^0-9]/g, '');
    if (String(onlyNumbers).length <= 8) {
      onlyNumbers = '506' + onlyNumbers;
    }
    return onlyNumbers;
  }

  public copy(val: string): void {
    copyToClipBoard(val, this.snackBar);
  }
}
