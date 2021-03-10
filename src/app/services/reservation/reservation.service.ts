import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private afs: AngularFirestore) {}

  public get reservations$(): Observable<Reservation[]> {
    return this.afs
      .collection<Reservation>('reservations')
      .valueChanges({ idField: 'id' });
  }

  public deleteReservation(id: string): Promise<void> {
    return this.afs.doc(`reservations/${id}`).delete();
  }

  public addReservation(body: any): Promise<DocumentReference> {
    return this.afs.collection('reservations').add(body);
  }

  public updateReservation(id: string, body: any): Promise<void> {
    return this.afs.doc(`reservations/${id}`).update(body);
  }
}
