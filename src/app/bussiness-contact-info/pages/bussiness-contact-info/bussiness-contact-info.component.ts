import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ContactInfo } from '../../../models/contact-info.model ';
import {
  getIconClassFromType,
  getLinkTypeFromType,
} from '../../../helpers/bussiness-contact.helpers';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BussinessContactDialogComponent } from '../../component/bussiness-contact-dialog/bussiness-contact-dialog.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BussinessContactBottomSheetComponent } from '../../component/bussiness-contact-bottom-sheet/bussiness-contact-bottom-sheet.component';

@Component({
  selector: 'app-bussiness-contact-info',
  templateUrl: './bussiness-contact-info.component.html',
  styleUrls: ['./bussiness-contact-info.component.scss'],
})
export class BussinessContactInfoComponent implements OnInit {
  public contactInfo$: Observable<ContactInfo[]>;
  constructor(
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    public auth$: AuthService
  ) {
    this.contactInfo$ = this.afs
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

  public copy(val: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.snackBar.open(`${val} ha sido copiado al portapapeles`, '', {
      duration: 2000,
    });
  }

  public openAddDialog(): void {
    const dialogRef = this.dialog.open(BussinessContactDialogComponent, {
      height: '400px',
      width: '300px',
    });
  }

  public openBottomSheet(contactInfo: ContactInfo): void {
    this.bottomSheet.open(BussinessContactBottomSheetComponent, {
      data: contactInfo,
    });
  }

  ngOnInit(): void {}
}
