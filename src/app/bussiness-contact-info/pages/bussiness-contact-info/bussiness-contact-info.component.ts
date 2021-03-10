import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactInfo } from '../../../models/contact-info.model ';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BussinessContactDialogComponent } from '../../component/bussiness-contact-dialog/bussiness-contact-dialog.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ContactInfoService } from 'src/app/services/contact-info/contact-info.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BussinessContactBottomSheetComponent } from '../../component/bussiness-contact-bottom-sheet/bussiness-contact-bottom-sheet.component';
import { copyToClipBoard } from 'src/app/helpers/utils.helpers';
@Component({
  selector: 'app-bussiness-contact-info',
  templateUrl: './bussiness-contact-info.component.html',
  styleUrls: ['./bussiness-contact-info.component.scss'],
})
export class BussinessContactInfoComponent implements OnInit {
  public contactInfo$: Observable<ContactInfo[]>;
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    public auth: AuthService,
    private contactInfoService: ContactInfoService
  ) {
    this.contactInfo$ = this.contactInfoService.contactInfo$;
  }

  public copy(val: string): void {
    copyToClipBoard(val, this.snackBar);
  }

  public openAddDialog(): void {
    this.dialog.open(BussinessContactDialogComponent, {
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
