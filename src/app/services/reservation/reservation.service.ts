import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
}
