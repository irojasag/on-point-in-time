import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormDialogComponent } from '../product-form-dialog/product-form-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../../../models/product.model';
import { getTextForProductType } from '../../../helpers/product.helpers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProductActionsBottomSheetComponent } from '../../components/product-actions-bottom-sheet/product-actions-bottom-sheet.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public productInfo$: Observable<Product[]>;
  constructor(
    public auth: AuthService,
    private dialog: MatDialog,
    private afs: AngularFirestore,
    private bottomSheet: MatBottomSheet
  ) {
    this.auth.user$.subscribe((user) => {
      if (user) {
        if (user.isAdmin) {
          this.productInfo$ = this.afs
            .collection<Product>('products')
            .valueChanges({ idField: 'id' })
            .pipe(
              map((productsCol) => {
                return (productsCol || []).map((productDoc) => ({
                  ...productDoc,
                  type: getTextForProductType(productDoc.type),
                  createdDate: productDoc.createdAt
                    ? productDoc.createdAt.toDate()
                    : null,
                  isExpired:
                    productDoc.expirationDate.toDate().getTime() <
                    new Date().getTime(),
                }));
              })
            );
        } else {
          this.productInfo$ = this.afs
            .collection<Product>('products', (ref) =>
              ref
                .where('isPublic', '==', true)
                .where(
                  'expirationDate',
                  '<=',
                  firebase.firestore.Timestamp.fromDate(new Date())
                )
            )
            .valueChanges({ idField: 'id' })
            .pipe(
              map((productsCol) => {
                return (productsCol || []).map((productDoc) => ({
                  ...productDoc,
                  type: getTextForProductType(productDoc.type),
                  createdDate: productDoc.createdAt
                    ? productDoc.createdAt.toDate()
                    : null,
                }));
              })
            );
        }
      }
    });
  }

  ngOnInit(): void {}

  public openAddDialog(): void {
    this.dialog.open(ProductFormDialogComponent, {
      height: '400px',
      width: '300px',
    });
  }
  public openActions(product: Product): void {
    this.bottomSheet.open(ProductActionsBottomSheetComponent, {
      data: product,
    });
  }
}
