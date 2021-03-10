import { Injectable } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { Purchase } from 'src/app/models/purchase.model';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { UserService } from '../user/user.service';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  constructor(
    private afs: AngularFirestore,
    private usersService: UserService
  ) {}

  public get purchases$(): Observable<Purchase[]> {
    return this.afs
      .collection<Purchase>('purchases')
      .valueChanges({ idField: 'id' });
  }

  public getUserPurchases$(userId: string): Observable<Purchase[]> {
    return this.afs
      .collection<Purchase>('purchases', (ref) => {
        return ref.where('clientId', '==', userId);
      })
      .valueChanges({ idField: 'id' });
  }

  public getAllPurchases(userId: string): Observable<Purchase[]> {
    return this.afs
      .collection<Purchase>('purchases', (ref) => {
        if (userId) {
          return ref
            .where('clientId', '==', userId)
            .orderBy('billNumber', 'desc');
        }
        return ref.orderBy('billNumber', 'desc');
      })
      .valueChanges({ idField: 'id' })
      .pipe(
        switchMap((purchases) => {
          return combineLatest([of(purchases), this.usersService.users$]);
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

  public getPurchasesFromDate$(minDate: Date): Observable<Purchase[]> {
    return this.afs
      .collection<Purchase>('purchases', (ref) => {
        return ref
          .where(
            'purchasedAt',
            '>=',
            firebase.firestore.Timestamp.fromDate(minDate)
          )
          .orderBy('purchasedAt', 'asc');
      })
      .valueChanges({ idField: 'id' });
  }
}
