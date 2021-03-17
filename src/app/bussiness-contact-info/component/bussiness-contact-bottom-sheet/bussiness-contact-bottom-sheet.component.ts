import { Component, OnInit, Inject } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { ContactInfo } from 'src/app/models/contact-info.model ';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactInfoService } from 'src/app/services/contact-info/contact-info.service';

@Component({
  selector: 'app-bussiness-contact-bottom-sheet',
  templateUrl: './bussiness-contact-bottom-sheet.component.html',
  styleUrls: ['./bussiness-contact-bottom-sheet.component.scss'],
})
export class BussinessContactBottomSheetComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<BussinessContactBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ContactInfo,
    private snackBar: MatSnackBar,
    private contactInfoService: ContactInfoService
  ) {}
  ngOnInit(): void {}

  public openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
  }

  public deleteData(event: MouseEvent): void {
    this.contactInfoService.deleteContactInfo(this.data.id).then(() => {
      this.bottomSheetRef.dismiss();
      this.snackBar.open(`${this.data.value} ha sido eliminado`, '', {
        duration: 2000,
      });
    });

    event.preventDefault();
  }
}
