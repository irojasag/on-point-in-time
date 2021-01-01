import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BussinessContactInfoRoutingModule } from './bussiness-contact-info-routing.module';
import { BussinessContactInfoComponent } from './pages/bussiness-contact-info/bussiness-contact-info.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { BussinessContactDialogComponent } from './component/bussiness-contact-dialog/bussiness-contact-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { BussinessContactBottomSheetComponent } from './component/bussiness-contact-bottom-sheet/bussiness-contact-bottom-sheet.component';

@NgModule({
  declarations: [
    BussinessContactInfoComponent,
    BussinessContactDialogComponent,
    BussinessContactBottomSheetComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BussinessContactInfoRoutingModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatListModule,
  ],
})
export class BussinessContactInfoModule {}
