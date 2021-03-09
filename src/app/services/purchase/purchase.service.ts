import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from 'src/app/models/purchase.model';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  constructor(private afs: AngularFirestore) {}

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
