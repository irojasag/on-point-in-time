import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentInfoRoutingModule } from './payment-info-routing.module';
import { PaymentInfoComponent } from './pages/payment-info/payment-info.component';
import { MatDividerModule } from '@angular/material/divider';
import { PaymentMethodFormComponent } from './component/payment-method-form/payment-method-form.component';
import { BankAccountFormComponent } from './component/bank-account-form/bank-account-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PaymentContactFormComponent } from './component/payment-contact-form/payment-contact-form.component';

@NgModule({
  declarations: [
    PaymentInfoComponent,
    PaymentMethodFormComponent,
    BankAccountFormComponent,
    PaymentContactFormComponent,
  ],
  imports: [
    CommonModule,
    PaymentInfoRoutingModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
  ],
})
export class PaymentInfoModule {}
