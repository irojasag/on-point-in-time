import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Purchase } from 'src/app/models/purchase.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  public purchasesSubject$: BehaviorSubject<Purchase[]>;
  private needToLoadPurchases: boolean;
  public userPurchasesSubject$: BehaviorSubject<Purchase[]>;
  private needToLoadUserPurchases: boolean;
  private latestUserId: string;

  constructor(private afs: AngularFirestore) {
    this.needToLoadPurchases = true;
    this.purchasesSubject$ = new BehaviorSubject([]);
    this.needToLoadUserPurchases = true;
    this.userPurchasesSubject$ = new BehaviorSubject([]);
  }

  public get purchases$(): Observable<Purchase[]> {
    if (this.needToLoadPurchases) {
      this.handlePurchasesSubscription();
      this.needToLoadPurchases = false;
    }
    return this.purchasesSubject$.asObservable();
  }

  private handlePurchasesSubscription(): void {
    this.afs
      .collection<Purchase>('purchases')
      .valueChanges({ idField: 'id' })
      .subscribe((purchases) => {
        this.purchasesSubject$.next(purchases);
      });
  }

  public getUserPurchases$(userId: string): Observable<Purchase[]> {
    if (this.needToLoadUserPurchases || this.latestUserId !== userId) {
      this.handleUserPurchasesSubscription(userId);
      this.needToLoadUserPurchases = false;
    }
    return this.userPurchasesSubject$.asObservable();
  }

  private handleUserPurchasesSubscription(userId): void {
    this.afs
      .collection<Purchase>('purchases', (ref) => {
        return ref.where('clientId', '==', userId);
      })
      .valueChanges({ idField: 'id' });
  }
}
