import { Injectable } from '@angular/core';
import { PaymentMethod } from 'src/app/models/payment-method.model';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodsService {
  constructor(private afs: AngularFirestore) {}

  public get paymentMethods$(): Observable<PaymentMethod[]> {
    return this.afs
      .collection<PaymentMethod>('payment-methods')
      .valueChanges({ idField: 'id' });
  }

  public deletePaymentMethod(id: string): Promise<void> {
    return this.afs.doc(`payment-methods/${id}`).delete();
  }

  public addPaymentMethod(body: any): Promise<DocumentReference> {
    return this.afs.collection('payment-methods').add(body);
  }
}
