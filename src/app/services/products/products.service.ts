import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
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

  public deleteProduct(id: string): Promise<void> {
    return this.afs.doc(`products/${id}`).delete();
  }

  public updateProduct(id: string, body: any): Promise<void> {
    return this.afs.doc(`products/${id}`).update(body);
  }

  public addProduct(body: any): Promise<DocumentReference> {
    return this.afs.collection('products').add(body);
  }

  public getProduct(id: string): Observable<Product> {
    return this.afs
      .doc<Product>(`products/${id}`)
      .valueChanges({ idField: 'id' });
  }
}
