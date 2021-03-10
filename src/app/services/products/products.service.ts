import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private afs: AngularFirestore) {}

  public get products$(): Observable<Product[]> {
    return this.afs
      .collection<Product>('products')
      .valueChanges({ idField: 'id' });
  }

  public get getPurchasesFromToday$(): Observable<Product[]> {
    return this.afs
      .collection<Product>('products', (ref) =>
        ref
          .where('isPublic', '==', true)
          .where(
            'expirationDate',
            '>=',
            firebase.firestore.Timestamp.fromDate(new Date())
          )
      )
      .valueChanges({ idField: 'id' });
  }
}
