import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CalendarNote } from 'src/app/models/calendar-note.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarNotesService {
  constructor(private afs: AngularFirestore) {}

  public get calendarNotes$(): Observable<CalendarNote[]> {
    return this.afs
      .collection<CalendarNote>('calendar-notes')
      .valueChanges({ idField: 'id' });
  }

  public deleteCalendarNote(id: string): Promise<void> {
    return this.afs.doc(`calendar-notes/${id}`).delete();
  }

  public addCalendarNote(body: any): Promise<DocumentReference> {
    return this.afs.collection('calendar-notes').add(body);
  }

  public updateCalendarNote(id: string, body: any): Promise<void> {
    return this.afs.doc(`calendar-notes/${id}`).update(body);
  }
}
