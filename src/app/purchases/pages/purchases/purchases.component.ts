import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { Purchase } from 'src/app/models/purchase.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PurchaseBottomSheetComponent } from '../../components/purchase-bottom-sheet/purchase-bottom-sheet.component';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss'],
})
export class PurchasesComponent implements OnInit {
  public purchases$: Observable<Purchase[]>;
  public isUserAdmin: boolean;
  constructor(
    public auth: AuthService,
    private afs: AngularFirestore,
    private bottomSheet: MatBottomSheet
  ) {
    this.isUserAdmin = false;
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.isUserAdmin = user.isAdmin || user.isSuperAdmin;
        const needsWhere = !this.isUserAdmin;
        this.purchases$ = this.afs
          .collection<Purchase>('purchases', (ref) => {
            if (needsWhere) {
              return ref
                .where('clientId', '==', user.uid)
                .orderBy('billNumber', 'desc');
            }
            return ref.orderBy('billNumber', 'desc');
          })
          .valueChanges({ idField: 'id' })
          .pipe(
            switchMap((purchases) => {
              const clientIds = [
                ...new Set(purchases.map((pur) => pur.clientId)),
              ];

              return combineLatest([
                of(purchases),
                combineLatest(
                  clientIds.map((clientId) =>
                    this.afs
                      .collection<User>('users', (ref) =>
                        ref.where('uid', '==', clientId)
                      )
                      .valueChanges()
                      .pipe(map((users) => users[0]))
                  )
                ),
              ]);
            }),
            map(([purchases, users]) => {
              return purchases.map((purchase) => {
                return {
                  ...purchase,
                  purchasedDate: purchase.purchasedAt.toDate(),
                  client: users.find((a) => a.uid === purchase.clientId),
                  products: (purchase.products || []).map((product) => ({
                    ...product,
                    expirationDateDisplay: product.expirationDate.toDate(),
                    startDateDisplay: (
                      product.startDate || purchase.purchasedAt
                    ).toDate(),
                  })),
                };
              });
            })
          );
      }
    });
  }

  public openBottomSheet(purchase: Purchase): void {
    this.bottomSheet.open(PurchaseBottomSheetComponent, {
      data: purchase,
    });
  }

  ngOnInit(): void {}
}
