import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfilePhotoBottomSheetComponent } from './components/profile-photo-bottom-sheet/profile-photo-bottom-sheet.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [ProfileComponent, ProfilePhotoBottomSheetComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatListModule,
  ],
})
export class ProfileModule {}
