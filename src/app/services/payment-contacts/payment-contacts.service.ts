import { Injectable } from '@angular/core';
import { PaymentContact } from 'src/app/models/payment-contact.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentContactsService {
  constructor(private afs: AngularFirestore) {}

  public get paymentContacts$(): Observable<PaymentContact[]> {
    return this.afs
      .collection<PaymentContact>('payment-contacts')
      .valueChanges({ idField: 'id' });
  }

  public deletePaymentContact(id: string): Promise<void> {
    return this.afs.doc(`payment-contacts/${id}`).delete();
  }
}
