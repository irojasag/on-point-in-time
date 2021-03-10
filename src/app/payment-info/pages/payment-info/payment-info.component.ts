import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PaymentContactsService } from 'src/app/services/payment-contacts/payment-contacts.service';
import { BankAccountsService } from 'src/app/services/bank-accounts/bank-accounts.service';
import { PaymentMethodsService } from 'src/app/services/payment-methods/payment-methods.service';
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
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private paymentContactsService: PaymentContactsService,
    private bankAccountsService: BankAccountsService,
    private paymentMethodsService: PaymentMethodsService
  ) {
    this.paymentMethods$ = this.paymentContactsService.paymentContacts$;
    this.bankAccounts$ = this.bankAccountsService.bankAccounts$;
    this.paymentContact$ = this.paymentMethodsService.paymentMethods$;
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
    this.paymentMethodsService
      .deletePaymentMethod(paymentMethod.id)
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
    this.bankAccountsService.deleteBankAccount(bankAccount.id).then(() => {
      this.snackBar.open(`${bankAccount.displayName} ha sido eliminado`, '', {
        duration: 2000,
      });
    });
  }

  public deletePaymentContact(paymentContact: PaymentContact): void {
    this.paymentContactsService
      .deletePaymentContact(paymentContact.id)
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
