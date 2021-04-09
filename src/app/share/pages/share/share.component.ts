import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactInfo } from '../../../models/contact-info.model ';
import { MatSnackBar } from '@angular/material/snack-bar';
import { copyToClipBoard } from 'src/app/helpers/utils.helpers';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})

export class ShareComponent implements OnInit {
  public contactInfo$: Observable<ContactInfo[]>;
  
  public baseUrl: string = window.location.origin;
  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  constructor(
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {}

  public copy(val: string): void {
    copyToClipBoard(val, this.snackBar);
  }

}
