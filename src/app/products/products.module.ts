import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { ProductFormDialogComponent } from './pages/product-form-dialog/product-form-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ProductActionsBottomSheetComponent } from './components/product-actions-bottom-sheet/product-actions-bottom-sheet.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductFormDialogComponent,
    ProductActionsBottomSheetComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    NativeDateModule,
    MatBottomSheetModule,
    MatListModule,
  ],
})
export class ProductsModule {}
