import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ContactInfo } from 'src/app/models/contact-info.model ';
import { map } from 'rxjs/operators';
import {
  getIconClassFromType,
  getLinkTypeFromType,
} from 'src/app/helpers/bussiness-contact.helpers';

@Injectable({
  providedIn: 'root',
})
export class ContactInfoService {
  constructor(private afs: AngularFirestore) {}

  public get contactInfo$(): Observable<ContactInfo[]> {
    return this.afs
      .collection<ContactInfo>('contact-info')
      .valueChanges({ idField: 'id' })
      .pipe(
        map((contactInfo) => {
          return contactInfo.map((info) => {
            return {
              ...info,
              icon: getIconClassFromType(info.type),
              linkType: getLinkTypeFromType(info.type),
            };
          });
        })
      );
  }

  public deleteContactInfo(id: string): Promise<void> {
    return this.afs.doc(`contact-info/${id}`).delete();
  }

  public addContactInfo(body: any): Promise<DocumentReference> {
    return this.afs.collection('contact-info').add(body);
  }
}
