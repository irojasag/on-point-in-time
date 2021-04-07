import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareComponent } from './pages/share/share.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ShareRoutingModule } from './share-routing.module';

@NgModule({
  declarations: [
    ShareComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgxQRCodeModule,
    ShareRoutingModule,
  ],
})

export class ShareModule {}
