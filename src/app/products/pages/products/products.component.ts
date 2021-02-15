import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormDialogComponent } from '../product-form-dialog/product-form-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../../../models/product.model';
import { getTextForProductType } from '../../../helpers/product.helpers';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProductActionsBottomSheetComponent } from '../../components/product-actions-bottom-sheet/product-actions-bottom-sheet.component';
import { ReservationSchedule } from 'src/app/models/reservation-schedule.model';

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
              switchMap((products) => {
                return combineLatest([
                  of(products),
                  this.afs
                    .collection<ReservationSchedule>('reservation-schedules')
                    .valueChanges({ idField: 'id' }),
                ]);
              }),
              map(([products, schedules]) => {
                return products.map((product) => {
                  return {
                    ...product,
                    type: schedules.find((s) => s.id === product.type)
                      .displayName,
                    createdDate: product.createdAt
                      ? product.createdAt.toDate()
                      : null,
                    expirationDateDisplay: product.expirationDate.toDate(),
                    isExpired:
                      product.expirationDate.toDate().getTime() <
                      new Date().getTime(),
                  };
                });
              })
            );
        } else {
          this.productInfo$ = this.afs
            .collection<Product>('products', (ref) =>
              ref
                .where('isPublic', '==', true)
                .where(
                  'expirationDate',
                  '>=',
                  firebase.firestore.Timestamp.fromDate(new Date())
                )
            )
            .valueChanges({ idField: 'id' })
            .pipe(
              switchMap((products) => {
                return combineLatest([
                  of(products),
                  this.afs
                    .collection<ReservationSchedule>('reservation-schedules')
                    .valueChanges({ idField: 'id' }),
                ]);
              }),
              map(([products, schedules]) => {
                return products.map((product) => {
                  return {
                    ...product,
                    type: schedules.find((s) => s.id === product.type)
                      .displayName,
                    createdDate: product.createdAt
                      ? product.createdAt.toDate()
                      : null,
                    expirationDateDisplay: product.expirationDate.toDate(),
                    isExpired:
                      product.expirationDate.toDate().getTime() <
                      new Date().getTime(),
                  };
                });
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
  public openActions(product: Product, isAdmin: boolean): void {
    if (isAdmin) {
      this.bottomSheet.open(ProductActionsBottomSheetComponent, {
        data: product,
      });
    }
  }
}
