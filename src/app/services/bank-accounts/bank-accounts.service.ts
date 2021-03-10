import { Injectable } from '@angular/core';
import { BankAccount } from 'src/app/models/bank-account.model';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BankAccountsService {
  constructor(private afs: AngularFirestore) {}

  public get bankAccounts$(): Observable<BankAccount[]> {
    return this.afs
      .collection<BankAccount>('bank-accounts')
      .valueChanges({ idField: 'id' });
  }

  public deleteBankAccount(id: string): Promise<void> {
    return this.afs.doc(`bank-account/${id}`).delete();
  }

  public addBankAccount(body: any): Promise<DocumentReference> {
    return this.afs.collection('bank-accounts').add(body);
  }
}
