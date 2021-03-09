import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
}
